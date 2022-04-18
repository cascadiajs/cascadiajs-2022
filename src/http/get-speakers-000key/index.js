let arc = require('@architect/functions')
let getSpeakerData = require('@architect/shared/get-speaker-data')
let SpeakerView = require('@architect/views/speaker')
let NotFoundView = require('@architect/views/404')

async function Speaker(req) {
  const { key } = req.params
  const { social } = req.queryStringParameters
  const { speakers } = await getSpeakerData(req)
  const speaker = speakers.find(s => s.key === key)
  if (speaker) {
    return await SpeakerView({speaker, social})
  }
}

exports.handler = arc.http.async(Speaker, NotFoundView)