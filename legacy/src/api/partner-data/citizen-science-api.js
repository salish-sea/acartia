import { GoogleSpreadsheet } from 'google-spreadsheet'
import User, { schema } from '../user/model'
import { checkDb } from './utils'

/**
 *----- CITIZEN SCIENCE GOOGLE SHEET DATA -> DB (LOADING METHODS) -----
 */

/**
 * citizenSciDoc is the URL to retreive data from Citizen Science google spreadsheet entries
 * shared from Resolve Conservation. Some helpful reference to implementing the
*/

// Load environment variables for details
const gKey = process.env.GOOGLE_SPREADSHEET_KEY
const gClientEmail = process.env.GOOGLE_SPREADSHEET_CLIENT_EMAIL
const citizenSciDoc = process.env.CITIZEN_SCIENCE_GOOGLE_ID

/**
 * Method to map CITIZEN SCIENCE data fields from the data into the ssemmi db
 */

// Validations before JSON mapping
function undefinedStrChecks (field) {
  if (field === undefined) {
    return 'N/A'
  } else {
    return field
  }
}

// Formatting data into a JSON payload
/** NOTE: ipfs-http doesn't support CBOR tags so the date fields had to be stringified
refer to https://github.com/ipfs/js-ipfs/issues/3043 **/
function ssemmiFormatting (entryData, count) {
  const source_input = {
    ssemmi_id: 'CITISCI' + count,
    data_source_name: 'Citizen-Science',
    data_source_entity: 'Resolve Conservation',
    data_source_id: count,
    created: `${entryData.Date} ${entryData.Time}`,
    photo_url: 'N/A',
    no_sighted: 'N/A',
    latitude: undefinedStrChecks(entryData.latitude),
    longitude: undefinedStrChecks(entryData.longitude),
    data_source_witness: entryData['Initial Sighting Source'],
    trusted: 'N/A',
    data_source_comments: `${entryData['Number and Behavior of Whales']}`
  }
  return source_input
}

// Method to load spreadsheet from Google
export const csLoadSpreadsheet = async () => {
  // Initialise the user data to be a bot designed for citizen science CRON jobs
  const userBot = await User.findById(process.env.CSCIENCE_BOT_ID)

  // Authenticating access to specified Google spreadsheets
  const gDoc = new GoogleSpreadsheet(citizenSciDoc)
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
        console.log('Adding data from CITIZEN SCIENCE documents to the DB....')

        // Tracks the entry count to log/trace
        const count = index + 1

        // Map Google sheets data to fit SSEMMI DB fields and formatting
        const entryFormatted = ssemmiFormatting(entry, index)

        await checkDb(entryFormatted, userBot)
      } catch (error) {
        console.log('There was an error adding to the db ', error)
      }
    }))

    // Increment to advance to next workbook
    i++
  }
}
