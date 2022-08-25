const data = require('@begin/data')

/**
 * Accepts an auth_hash as a query parameter
 *
 * Returns auth_hash, conn_hash, full_name, email_share, linkedin, twitter, github, bio
 */
exports.handler = async function(req) {
  const { auth_hash } = req.queryStringParameters
  //console.log(authHash)
  let tickets = await data.get({ table: 'tickets', limit: 1000 })
  let ticket = tickets.find((t) => t.auth_hash === auth_hash)
  if (ticket) {
    console.log(ticket)
    let { auth_hash, conn_hash, full_name, email_share, linkedin, twitter, github, bio } = ticket
    return { auth_hash, conn_hash, full_name, email_share, linkedin, twitter, github, bio }
  }
  else {
    return { status: 404 }
  }
}
