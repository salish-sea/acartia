import { Router } from 'express'
import { userToken } from '../../services/passport'
import { dbGetAll, dbGetItem, dbPost, dbDelete, dbQueryTrusted } from '../../services/orbitdb'
import { exportCSV, importCSV } from './controller'
import dayjs from 'dayjs'
import multer from 'multer'
import os from 'os'

const router = new Router()

// List on all sightings with token restrictions
router
  .route('/')
  /**
   * @api {get} /sightings Retrieve current sightings
   * @apiName RetrieveSightings
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} List of sightings.
   */
  .get(userToken(), (req, res) => {
    res.send(dbGetAll())
  })
  /**
   * @api {post} /sightings Contribute sightings
   * @apiName PostSightings
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} Entry of sighting.
   * @apiError 400 Invalid input.
   */
  .post(userToken(), (req, res) => {
    if (!req.body) {
      res.send('Invalid input 400')
      return
    }
    console.info(req.user)
    res.send(dbPost(req.body, req.user))
  })

// List on all sightings with token restrictions
router
  .route('/current')
  /**
   * @api {get} /sightings/current Retrieve current sightings
   * @apiName RetrieveCurrentSightings
   * @apiGroup Sightings
   * @apiPermission user
   * @apiSuccess {Object} List of sightings.
   */
  .get((req, res) => {
    res.send(dbGetAll(true))
  })

router
  .route('/export')
  /**
   * @api {get} /sightings Retrieve current sightings
   * @apiName RetrieveSightings
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} List of sightings.
   */
  .get(userToken(), async (req, res) => {
    const csv = await exportCSV()
    res.header('Content-Type', 'text/csv')
    res.attachment(`Acartia-Export-${dayjs().format('DD/MM/YYYY')}.csv`)

    res.send(csv)
  })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir())
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + dayjs() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000 // 10000000 Bytes = 10 MB
  },
  fileFilter (req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      // upload only csv format
      return cb(new Error('Please upload a csv'))
    }
    cb(undefined, true)
  }
})

router
  .route('/import')
  /**
   * @api {post} /sightings Retrieve current sightings
   * @apiName RetrieveSightings
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} List of sightings.
   */
  .post(userToken(), upload.single('file'), importCSV)

router
  .route('/:id')
  /**
   * @api {get} /sightings/:id Retrieve specific sightings
   * @apiName RetrieveSpecificSighting
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} Sighting based on id.
   */
  .get(userToken(), (req, res) => {
    res.send(dbGetItem(req.params.id))
  })
  /**
   * @api {delete} /sightings/:id Delete specific sightings
   * @apiName DeleteSpecificSighting
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} 200 Deleted sighting entry.
   */
  .delete(userToken(), (req, res) => {
    res.send(dbDelete(req.params.id))
  })
// // PUT specific data
// .put((req, res) => {
//     res.send( dbPost(req.body) );
// });

// List sightings from trusted sources
router
  .route('/import/getTemplate')
  /**
   * @api {get} /sightings/trusted Retrieve sightings marked as trusted
   * @apiName RetrieveTrustedSighting
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} Sightings with trusted source.
   */
  .get(userToken(), (req, res) => {
    const dirPath = 'src/public/'
    const fileName = 'acartia-import-template.csv'
    res.download(dirPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({ message: `There was an error when trying to download the file: ${err}` })
      }
    })
  })

// List sightings from trusted sources
router
  .route('/trusted')
  /**
   * @api {get} /sightings/trusted Retrieve sightings marked as trusted
   * @apiName RetrieveTrustedSighting
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} Sightings with trusted source.
   */
  .get(userToken(), (req, res) => {
    res.send(dbQueryTrusted())
  })

export default router
