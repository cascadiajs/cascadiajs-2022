let arc = require('@architect/functions')
let screenshot = require('./screenshot')

/**
 *
 */
async function Social (req) {
  const { path } = req.queryStringParameters
  try {
    let file = await screenshot({ path })
    return {
      type: 'image/png',
      length: file.length,
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