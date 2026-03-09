import request from 'request'
import { checkDb } from './utils'
import User, { schema } from '../user/model'

/**
 *----- SPOTTER API DATA -> DB (LOADING METHODS) -----
 */

/**
 * conserveApi is the URL to retreive data from Conserve.IO app
 * The BBOX parameter on the URL indicates the location
 * and the start/end parameter marks the date of sighting, with 7 days range as default
 * species parameter specifies the types of whales, but in our case it should be 'Orcinus orca'
 */

// Specify current date to put into the API parameter
var yesterdaysDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
var dd = String(yesterdaysDate.getDate()).padStart(2, '0')
var mm = String(yesterdaysDate.getMonth() + 1).padStart(2, '0') // January is 0
var yyyy = yesterdaysDate.getFullYear()

// Convert the current date to string for JSON load - refer to the source_input date variable
yesterdaysDate = String(yesterdaysDate)

// Formatting on current date for API parameter
var currentDayFormat = `${yyyy}-${mm}-${dd}`
// Current day format to display sightings since the current year
export const conserveApi = `https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=${currentDayFormat}`

const conHistory = 'https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=2020-01-01'

// Retreive data from the URL
export const loadApi = async (api, loadHistory = false) => {
  // Initialise the user data to be a bot designed for spotter CRON jobs
  const userBot = await User.findById(process.env.SPOTTER_BOT_ID)
  if (loadHistory) {
    api = conHistory
  }

  // Request connection to the API
  request(api, async (err, resp, body) => {
    console.log('Connecting to Spotter API... \n')
    if (!err) {
      // Parsing the JSON from the data, parameters are 'count' and 'results'
      var jsonData = JSON.parse(body)
      var count = 0

      // Iterate over the sightings data to fill DB
      for (var i = 0; i < jsonData.results.length; i++) {
        // Mapping relevant fields from the data into the ssemmi db
        /** NOTE: ipfs-http doesn't support CBOR tags so the date fields had to be stringified
                refer to https://github.com/ipfs/js-ipfs/issues/3043 **/
        var source_input = {
          ssemmi_id: 'SPOTTER' + jsonData.results[i].id,
          data_source_name: 'Spotter-API',
          data_source_entity: 'Conserve.io',
          data_source_id: jsonData.results[i].id,
          created: jsonData.results[i].created,
          photo_url: jsonData.results[i].photo_url,
          no_sighted: jsonData.results[i].number_sighted,
          latitude: jsonData.results[i].latitude,
          longitude: jsonData.results[i].longitude,
          type: jsonData.results[i].name,
          data_source_witness: jsonData.results[i].usernm,
          trusted: jsonData.results[i].trusted,
          data_source_comments: jsonData.results[i].comments
        }

        // Wrap in a try catch to put into the db
        try {
          // Add data into SSEMMI decentralised database
          console.log(`Adding data from date ${currentDayFormat} to the DB....`)
          // Tracks the entry count to log/trace
          count += 1
          console.log(`Entry count: ${count}\n`)
          // Display data from entry load
          await checkDb(source_input, userBot)
        } catch (error) {
          console.log('There was an error adding to the db ', error)
        }
      }
      // Show the number of entries of the day from the Spotter API
      console.log(`There were ${jsonData.results.length} entries added from Spotter API \n`)
    }
  })
}
