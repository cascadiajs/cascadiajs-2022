const data = require('@begin/data')

/**
 * Accepts authHash and updates full_name, emailShare, linkedin, twitter
 */
exports.handler = async function(req) {
  const ticket = JSON.parse(req.body)
  const { auth_hash, full_name, email_share, linkedin, twitter } = ticket
  //console.log(ticket)
  let tickets = await data.get({ table: 'tickets', limit: 1000 })
  let match = tickets.find((t) => t.auth_hash === auth_hash)
  if (auth_hash && match) {
    await data.set({ ...match, full_name, email_share, linkedin, twitter  })
    return { status: "OK" }
  }
  else {
    return { status: 403, message: "Not Authorized" }
  }
}
