const data = require('@begin/data')
let arc = require('@architect/functions')

/**
 * Accepts an auth_hash as a query parameter
 *
 * Returns auth_hash, conn_hash, full_name, email_share, linkedin, twitter, github, bio
 */
async function GetTicket (req) {
  const { auth_hash } = req.queryStringParameters
  console.log("Calling API: ", auth_hash)
  let tickets = await data.get({ table: 'tickets', limit: 1000 })
  let ticket = tickets.find((t) => t.auth_hash === auth_hash)
  if (ticket) {
    console.log(ticket)
    let { auth_hash, conn_hash, full_name, email_share, linkedin, twitter, github, bio } = ticket
    return { json: { auth_hash, conn_hash, full_name, email_share, linkedin, twitter, github, bio } }
  }
  else {
    return { json: { status: 404 } }
  }
}

exports.handler = arc.http.async(GetTicket)