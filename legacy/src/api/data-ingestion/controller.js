import { dbGetAll, dbPost } from '../../services/orbitdb'
import { Parser, transforms } from 'json2csv'
import parse from 'csv-parse/lib/sync'
import fs from 'fs'

export const exportCSV = async () => {
  try {
    const exportData = await dbGetAll()
    const fields = ['ssemmi_id', 'entry_id', 'data_source_name', 'data_source_entity',
      'created', 'photo_url', 'no_sighted', 'profile.name', 'profile.website', 'profile.logo',
      'latitude', 'longitude', 'data_source_witness', 'type', 'data_source_comments']
    const transform = [transforms.unwind({ paths: ['profile'] })]
    const jsonParser = new Parser({
      fields,
      transform
    })
    return jsonParser.parse(exportData)
  } catch (e) {
    throw e
  }
}

export const importCSV = async (req, res) => {
  try {
    console.log(req.file)
    const csvData = await fs.readFileSync(req.file.path)
    const formattedData = parse(csvData, { columns: true, skip_empty_lines: true })
    console.info('Import file successful read and formatted')
    await fs.unlink(req.file.path, (err) => {
      if (err) { console.log(err) } else {
        console.log('Temporary file deleted\n')
      }
    })

    await Promise.all(formattedData.map(async (rec) => {
      await dbPost(rec, req.user)
    }))
    res.send({ status: 'success' })
  } catch (e) {
    console.error(`There was an error importing the file: ${e}`)
    res.status(500).json({ error: e })
  }
}
