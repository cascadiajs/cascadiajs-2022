let arc = require('@architect/functions')
//let screenshot = require('./screenshot')
/* let AWS = require('aws-sdk')

function getBaseUrl() {
  let url
  if (process.env.NODE_ENV === 'testing') {
      url = 'http://localhost:3333'
  }
  else  {
      url = `https://${ process.env.NODE_ENV === 'staging' ? 'staging.' : '' }2022.cascadiajs.com`
  }
  return url
}*/

async function ticketShared (event) {
  console.log(JSON.stringify(event, null, 2))
  /* HOT FIX for Lambda/Puppeteer issue
  let number = event.number
  try {
    let url = `${ getBaseUrl() }/tickets/${ number }?social`
    let file = await screenshot({ url })
    // remove this line when issue is fixed
    const s3 = new AWS.S3()
    let fileName = `ticket-${ number }.png`
    await s3
      .putObject({
        Bucket: process.env.ARC_STATIC_BUCKET,
        Key : process.env.ARC_STATIC_PREFIX + '/' + fileName,
        ContentType: 'image/png',
        Body: file,
        ACL: 'public-read',
      })
      .promise()

  }
  catch (error) {
    console.log(error)
  }
  END HOT FIX */
  return
}

exports.handler = arc.events.subscribe(ticketShared)