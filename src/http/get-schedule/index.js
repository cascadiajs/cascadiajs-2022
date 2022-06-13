let arc = require('@architect/functions')
let ScheduleView = require('@architect/views/schedule')
const getSpeakerData = require('@architect/shared/get-speaker-data')

/**
 * Display the full schedule
 */

async function Schedule (req) {
  let { speakers } = await getSpeakerData(req)
  let { thin } = req.queryStringParameters
  return await ScheduleView({ speakers, thin })
}

exports.handler = arc.http.async(Schedule)
