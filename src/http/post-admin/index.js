let arc = require('@architect/functions')

exports.handler = arc.http.async(login)

async function login(req) {
  let loggedIn = req.body.password === process.env.ADMIN_PASSWORD
  let location = '/admin'
  return { session: { loggedIn }, location }
}
