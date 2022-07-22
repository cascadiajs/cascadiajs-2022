let arc = require('@architect/functions')
let data = require('@begin/data')
let activities = require('@architect/shared/data/activities.json')
let { send_email } = require('./cio-send')

// Handles log-in to the /home/* pages
exports.handler = arc.http.async(processAction)

async function processAction(req) {
  let { action } = req.params
  let { ticketRef } = req.session
  let location
  if (action === 'login') {
    return send_magic_link(req)
  }
  else if (action === 'rsvp') {
    // process RSVP request
    let { activityKey, register } = req.body
    if (register) {
      // check to see the user is not already RSVP'd for an activity
      let rsvp = await data.get({table: 'rsvps', key: ticketRef })
      if (!rsvp) {
        // check to see if the activity has open spots
        let activity = activities.find((a) => a.key === activityKey)
        let rsvpData = await data.get({table: 'rsvps', limit: 500 }) || []
        if (rsvpData.filter((r) => r.activity === activityKey).length < activity.cap) {
          // create the RSVP
          await data.set({ table: 'rsvps', key: ticketRef, activity: activityKey })
          location = '/home/dashboard'
        }
        else {
          location = `/home/dashboard?message=${ encodeURIComponent('Sorry, there are no more spots open') }`
        }
      }
      else {
        location = `/home/dashboard?message=${ encodeURIComponent('You may only RSVP for one Activity at a time') }`
      }
    }
    else {
      await data.destroy({ table: 'rsvps', key: ticketRef })
      location = '/home/dashboard'
    }
  }
  else {
    location = '/404'
  }

  return { location }
}

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
      if (process.env.NODE_ENV === 'testing') {
        // if in TEST, complete log-in process
        location = `/home/verify?ticketRef=${ ticket.key }&token=${ token }`
      }
      else {
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
    }
    else {
      location = `/home/login?message=${ encodeURIComponent("We could not find a virtual or in-person conference pass with that email address.") }`
    }
  }

  // redirect
  return { session, location }
}
