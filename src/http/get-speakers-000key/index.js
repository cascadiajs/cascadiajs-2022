let arc = require('@architect/functions')
let getSpeakerData = require('@architect/shared/get-speaker-data')
let SpeakerView = require('@architect/views/speaker')
let PageView = require('@architect/views/pages')
let NotFoundView = require('@architect/views/404')
let { pageExists } = require('@architect/shared/utils/pages')

async function Speaker(req) {
  const { key } = req.params
  const { social } = req.queryStringParameters
  const { speakers } = await getSpeakerData(req)
  const speaker = speakers.find(s => s.key === key)
  if (speaker) {
    return await SpeakerView({speaker, social})
  }
  // the path matches a markdown file in our filesystem
  else if (pageExists(req.path)) {
    return await PageView(req)
  }
}

exports.handler = arc.http.async(Speaker, NotFoundView)