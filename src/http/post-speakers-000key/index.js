let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(auth, upsert_or_delete, upload)

/** ensure session */
async function auth(req) {
  if (!req.session.loggedIn)
    return { location: '/' }
}

/** write to begin/data */
async function upsert_or_delete(req) {
  if (req.body.__delete) {
    await data.destroy({table: 'speakers', key: req.params.key })
  }
  else if (req.params.key !== 'upload') {
    if (!req.body.key)
      req.body.key = req.body.name.toLowerCase().replace(/ /, '-')

    req.body.topics = req.body.topics.split(",")
      // fixes case of spaces in topics 'a,  b,  c , d'
      // allows for spaces in topic names like 'machine learning'
    .map(t => t.trim())

    await data.set({
      table: 'speakers',
      ...req.body
    })

    return { location: '/admin' }
  }
}

/** write to begin/data */
async function upload(req) {
  let speakers = req.body
  for (let i in speakers) {
    let speaker = speakers[i]
    await data.set({
      table: 'speakers',
      ...speaker
    })
  }

  return {
    statusCode: 201,
    body: JSON.stringify({success: true})
  }
}

