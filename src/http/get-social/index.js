let AWS = require('aws-sdk')
let crypto = require('crypto')
let arc = require('@architect/functions')
let screenshot = require('./screenshot')

/**
 *
 */
async function Social (req) {
  const { path } = req.queryStringParameters
  const s3 = new AWS.S3()
  try {
    let file = await screenshot({ path })
    let urlhash = crypto
    .createHash('sha1')
    .update(path)
    .digest('base64')
    let Key = urlhash + '.png'
    await s3
      .putObject({
        Bucket: process.env.ARC_STATIC_BUCKET,
        Key,
        Body: file,
        ACL: 'public-read',
      })
      .promise()
    console.log(`${ process.env.BEGIN_STATIC_ORIGIN}/${ Key }`)
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