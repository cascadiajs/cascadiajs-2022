let crypto = require('crypto')
let data = require('@begin/data')
let AWS = require('aws-sdk')
let arc = require('@architect/functions')
let screenshot = require('./screenshot')

async function Social (req) {
  const s3 = new AWS.S3()
  const { path, rebuild } = req.queryStringParameters
  console.log(path, rebuild)

  let table = 'social'
  
  // use the path to generate a hash value
  let key = crypto
  .createHash('sha1')
  .update(path)
  .digest('base64')

  // see if this image reference exists in the DB
  let record = await data.get({ table, key })
  console.log(record)

  let fileName = `social-${ key }.png`

  // if it does not or we are triggering a rebuild, build and store the image
  if (!record || rebuild) {
    console.log('generating screen shot')
    try {
      // build the image
      let file = await screenshot({ path })
      // store it in S3
      let fileName = `social-${ key }.png`
      console.log('writing to S3: ', fileName)
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
      console.log('writing record to DB')
      await data.set({table, key, path, created: Date.now()})
    }
    catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: error.toString()
      }
    }
  }

  // read and return image data from s3
  let object = await s3
    .getObject({
      Bucket: process.env.ARC_STATIC_BUCKET,
      Key : process.env.ARC_STATIC_PREFIX + '/' + fileName
    })
    .promise()

  console.log(object.ContentLength, object.ContentType, object.CacheControl)

  return {
    type: object.ContentType,
    length: object.ContentLength,
    'Cache-Control': object.CacheControl,
    body: object.Body
  }

  // The Twitter scraper bot doesn't accept 302 redirect for images
  //return {
  //  location: `${ process.env.BEGIN_STATIC_ORIGIN }/social-${ key }.png`
  //}
}

exports.handler = arc.http.async(Social)