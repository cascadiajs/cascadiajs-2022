let crypto = require('crypto')
let data = require('@begin/data')
let AWS = require('aws-sdk')
let arc = require('@architect/functions')
let screenshot = require('./screenshot')

async function Social (req) {
  const { path, rebuild } = req.queryStringParameters

  let table = 'social'
  
  // use the path to generate a hash value
  let key = crypto
  .createHash('sha1')
  .update(path)
  .digest('base64')

  // see if this image reference exists in the DB
  let record = data.get({table, key })
  
  // if it does not or we are triggering a rebuild, build and store the image
  if (!record || rebuild) {
    try {
      // build the image
      let file = await screenshot({ path })
      // store it in S3
      const s3 = new AWS.S3()
      let fileName = `social-${ key }.png`
      await s3
        .putObject({
          Bucket: process.env.ARC_STATIC_BUCKET,
          Key : process.env.ARC_STATIC_PREFIX + '/' + fileName,
          ContentType: 'image/png',
          Body: file,
          ACL: 'public-read',
        })
        .promise()  
      // store a record in the DB
      data.set({table, key, path, created: Date.now()})
    }
    catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: error.toString()
      }
    }
  }

  return {
    location: `${ process.env.BEGIN_STATIC_ORIGIN }/social-${ key }.png`
  }
}

exports.handler = arc.http.async(Social)