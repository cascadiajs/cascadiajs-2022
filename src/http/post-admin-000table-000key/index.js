let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(auth, delete_or_upsert)

/** ensure session */
async function auth(req) {
  if (!req.session.loggedIn)
    return { location: '/' }
}

async function delete_or_upsert(req) {
  let { table, key } = req.params
  // if this is a create operation, get the key from the POST body
  key = key || req.body.key
  if (req.body.__delete) {
    await data.destroy({table, key })
  }
  else {
    await data.set({
      table,
      ...req.body
    })
  }
  return { location: '/admin' }
}
