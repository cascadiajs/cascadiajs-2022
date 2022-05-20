let arc = require('@architect/functions')
let data = require('@begin/data')
let { send_email } = require('./cio-send')

// Handles log-in to the /home/* pages
exports.handler = arc.http.async(send_magic_link)

async function send_magic_link(req) {
  let session, location 
  let { email } = req.body
  let validSlugs = process.env.TITO_CONF_SLUGS.split(',')

  if (req.body.reset) {
    session = {}
    location = '/'
  }
  else {     
    // find the conference ticket associated with this email address
    let ticketData = await data.get( { table: 'tickets', limit: 5000 })
    let ticket
    for (let i in ticketData) {
      let record = ticketData[i]
      if (record.email === email && validSlugs.indexOf(record.release_slug) >= 0) {
        ticket = record
        break
      }
    }      
    if (ticket) {
      // create token
      let token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
      let expires = Date.now() + 5*60*1000 // expires in 5 minutes
      // store it in the DB
      data.set( { table: 'logins', key: ticket.key, token, expires })
      // send email with the verify link and token
      let verify_url = `https://2022.cascadiajs.com/home/verify?ticketRef=${ ticket.key }&token=${ token }`
      await send_email({
        email,
        transactional_message_id: 2,
        message_data: { verify_url }
      })
      // redirect to "check your email" page
      location = `/home/check?email=${ encodeURIComponent(email) }`
    }
    else {
      location = '/home/login?notfound'
    }
  }

  // redirect
  return { session, location }
}
