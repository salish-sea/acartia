import { GoogleSpreadsheet } from 'google-spreadsheet'
import User, { schema } from '../user/model'
import { checkDb } from './utils'

/**
 *----- ORCA MAP GOOGLE SHEET API DATA -> DB (LOADING METHODS) -----
 */

/**
 * orcaMapSheet is the URL to retreive data from Orca Map Project google spreadsheet entries
 */

// Load environment variables for details
const gKey = process.env.GOOGLE_SPREADSHEET_KEY
const gClientEmail = process.env.GOOGLE_SPREADSHEET_CLIENT_EMAIL
const orcaMapDoc = process.env.ORCA_MAP_GOOGLE_ID

// Method to map relevant fields from the data into the ssemmi db
/** NOTE: ipfs-http doesn't support CBOR tags so the date fields had to be stringified
refer to https://github.com/ipfs/js-ipfs/issues/3043 **/
function ssemmiFormatting (entryData, count) {
  // Set trusted field to lower case and whitespace free verified field from entry
  const trustedEntry = entryData['verified?'].trim().toLowerCase()
  // Check if truly verified before assigning entry as trusted
  let trustedInput
  if (trustedEntry === 'yes') {
    trustedInput = 1
  } else {
    trustedInput = 0
  }

  // Validations before JSON mapping
  function undefinedStrChecks (field) {
    if (field === undefined) {
      return 'N/A'
    } else if (field.trim().toLowerCase() === '') {
      return 'N/A'
    } else {
      return field
    }
  }

  // Map entries into a SSEMMI compliant JSON format
  const source_input = {
    ssemmi_id: 'ORCAMAP' + count,
    data_source_name: 'Orca Map',
    data_source_entity: 'Orca Map',
    data_source_id: entryData.timestamp,
    created: `${String(entryData.humantime)}`,
    photo_url: undefinedStrChecks(entryData['Photo link']),
    no_sighted: 'N/A',
    latitude: entryData.latitude,
    longitude: entryData.longitude,
    data_source_witness: entryData.user,
    trusted: trustedInput,
    data_source_comments: `${entryData.type} entry: ${entryData.Notes}`
  }

  // Return the JSON payload to advance to the next step
  return source_input
}

// Method to load spreadsheet from Google
export const omLoadSpreadsheet = async () => {
  // Initialise the user data to be a bot designed for orca map CRON jobs
  const userBot = await User.findById(process.env.ORCAMAP_BOT_ID)

  // Authenticating access to specified Google spreadsheets
  const gDoc = new GoogleSpreadsheet(orcaMapDoc)
  await gDoc.useServiceAccountAuth({
    client_email: gClientEmail,
    private_key: gKey
  })
  // Loads document properties and worksheets
  await gDoc.loadInfo()

  // Iterate through the sheets within the documents using length caching for optimum speed
  let i = 0; const gSheets = gDoc.sheetCount
  while (i < 1) {
    // Set current worksheet
    const sheet = gDoc.sheetsByIndex[2]
    // Load all rows (skipping the header with the offset)
    const sheetRows = await sheet.getRows({ offset: 0 })

    // Map all row values from current workbook as JSON payload
    await Promise.all(sheetRows.map(async (entry, index) => {
      try {
        console.log('Adding data from ORCA MAP documents to the DB....')

        // Map Google sheets data to fit SSEMMI DB fields and formatting
        const count = index + 1
        const entryFormatted = ssemmiFormatting(entry, count)
        await checkDb(entryFormatted, userBot)
      } catch (error) {
        console.log('There was an error adding to the db ', error)
      }
    }))

    // Increment to advance to next workbook
    i++
  }
}
