let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(auth, delete_or_upsert)

/** ensure session */
async function auth(req) {
  if (!req.session.loggedIn)
    return { location: '/' }
}

async function delete_or_upsert(req) {
  let { key } = req.params
  if (req.body.__delete) {
    await data.destroy({table: 'tickets', key })
  }
  else {
    await data.set({
      table: 'tickets',
      ...req.body
    })
  }
  return { location: '/admin' }
}



