let arc = require('@architect/functions')
let data = require('@begin/data')
let getSpeakerData = require('@architect/shared/get-speaker-data')
let StreamView = require('@architect/views/live/stream')
let ExpoView = require('@architect/views/live/expo')
let JobsView = require('@architect/views/live/jobs')
let NotFoundView = require('@architect/views/404')

// check for session
async function unauthenticated(req) {
  if (req.session.ticketRef) return
  else {
    let location = `/home/login?message=${ encodeURIComponent('You must be logged-in to access this page') }`
    return { location }
  }
}

// display live stream page
async function authenticated(req) {
  let ticket = await data.get({ table: 'tickets', key: req.session.ticketRef })
  let speakerData = await getSpeakerData(req)
  let speakers = speakerData.speakers
  let { view } = req.params
  let links = await data.get( {table: 'links', limit: 100 })
  // enable override of the playbackId for testing purposes
  let playbackIdOverride = req.queryStringParameters.playbackId
  let setting = await data.get( {table: 'settings', key: 'playbackId' })
  let playbackId = playbackIdOverride || (setting ? setting.value : undefined)
  if (view === 'stream') {
    return StreamView({ speakers, ticket, links, playbackId })
  }
  else if (view === 'expo') {
    return ExpoView({ links })
  }
  else if (view === 'jobs') {
    return JobsView({ links })
  }
  else {
    return
  }
}

exports.handler = arc.http.async(unauthenticated, authenticated, NotFoundView)