import { dbGetItem, dbPost } from '../../services/orbitdb'

export async function checkDb (entryFormatted, userBot) {
  // Now lets check if the entry already exists in the db as is
  /*
  This code block is for if we want to do a more detailed match to check for updates
  const searchEnt = {}
  Object.assign(searchEnt, entryFormatted)
  delete searchEnt.entry_id
  console.log('Search Entry', searchEnt)
   */
  const currEntry = await dbGetItem(entryFormatted.ssemmi_id)
  const existing = (currEntry.length !== 0)

  const message = `SSEMMI ID ${entryFormatted.ssemmi_id}`

  // Add data into the decentralised database
  if (!existing) {
    await dbPost(entryFormatted, userBot)

    // Display success alert of entry added to the db
    console.log(entryFormatted)

    console.log(message, 'successfully added to the DB\n')
    return true
  } else {
    console.log(message, 'already exists in the DB and was not added\n')
    return false
  }
}
