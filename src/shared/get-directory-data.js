const data = require('@begin/data')

module.exports = async function GetDirectoryData (req) {
  let ticketList = await data.get({ table: 'tickets', limit: 1000 })
  // only include folks who have added themselves via Github Oauth to the Conference Directory
  let directoryList = ticketList.filter(t => t.github && t.github !== '')
  return directoryList
}