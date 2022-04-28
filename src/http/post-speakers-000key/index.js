let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(auth, delete_or_upsert)

/** ensure session */
async function auth(req) {
  if (!req.session.loggedIn)
    return { location: '/' }
}

async function delete_or_upsert(req) {
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
  }
  return { location: '/admin' }
}



