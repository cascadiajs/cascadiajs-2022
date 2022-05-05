let crypto = require('crypto')
let data = require('@begin/data')
let arc = require('@architect/functions')
let screenshot = require('./screenshot')

/**
 *
 */
async function Social (req) {
  const { path } = req.queryStringParameters
  try {
    let table = 'social'
    let key = crypto
      .createHash('sha1')
      .update(path)
      .digest('base64')
    let file = await screenshot({ path })
    //data.set({ table, key, file })
    console.log(table, key, file.length)
    return {
      type: 'image/png',
      length: file.length,
      'Cache-Control': 'public, max-age=86400',
      body: file
    }
  }
  catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: error.toString()
    }
  }
}

exports.handler = arc.http.async(Social)