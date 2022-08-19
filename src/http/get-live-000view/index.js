let arc = require('@architect/functions')
let data = require('@begin/data')
let getSpeakerData = require('@architect/shared/get-speaker-data')
let StreamView = require('@architect/views/live/stream')
let ExpoView = require('@architect/views/live/expo')
let JobsView = require('@architect/views/live/jobs')
let EmbedView = require('@architect/views/live/embed')
let WebInputView = require('@architect/views/live/web-input')
let NotFoundView = require('@architect/views/404')

async function getPlaybackId(req) {
  // enable override of the playbackId for testing purposes
  let playbackIdOverride = req.queryStringParameters.playbackId
  let setting = await data.get( {table: 'settings', key: 'playbackId' })
  return playbackIdOverride || (setting ? setting.value : undefined)
}

async function Live(req) {
  let { view } = req.params
  let ticket
  if (req.session.ticketRef) {
    ticket = await data.get({ table: 'tickets', key: req.session.ticketRef })
  }
  let speakerData = await getSpeakerData(req)
  let speakers = speakerData.speakers
  //let links = await data.get( {table: 'links', limit: 100 })
  let playbackId = await getPlaybackId(req)

  if (view === 'embed') {
    return EmbedView({ playbackId })
  }
  else if (view === 'web-input') {
    return WebInputView({ playbackId })
  }
  else if (view === 'stream') {
    return StreamView({ speakers, ticket, playbackId })
  }
  else if (view === 'expo') {
    return ExpoView()
  }
  else if (view === 'jobs') {
    return JobsView()
  }
  else {
    return
  }
}

exports.handler = arc.http.async(Live, NotFoundView)