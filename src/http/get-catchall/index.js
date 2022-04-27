// eslint-disable-next-line no-global-assign
require = require('esm')(module)
let arc = require('@architect/functions')
let IndexView = require('@architect/views/index')
let PageView = require('@architect/views/pages')
let NotFoundView = require('@architect/views/404')
let { pageExists } = require('@architect/shared/utils/pages')
let manifest = require('@architect/shared/static.json')
let getSpeakerData = require('@architect/shared/get-speaker-data')

// return truthy if the asset requested is in our static manifest JSON, falsy otherwise
function staticExists(path) {
  let asset = path.substr(1)
  return manifest[asset]
}

/**
 * This router passes the request to the appropriate view or static asset
 */
async function Router (req) {
  // root (/) request, return Index view
  if (req.path === '/') {
      let { speakers } = await getSpeakerData(req)
      return await IndexView({ speakers })
  }
  // the path matches a markdown file in our filesystem
  else if (pageExists(req.path)) {
    return await PageView(req)
  }
  // the path matches a static file we know about
  else if (staticExists(req.path)) {
    return {
      statusCode: 301,
      headers: {
        location: arc.static(req.path)
      }
    }
  }
  else return
}

exports.handler = arc.http.async(Router, NotFoundView)