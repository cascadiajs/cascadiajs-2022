const arc = require('@architect/functions')
const data = require('@begin/data')
const crypto = require("crypto")
const activities = require('@architect/shared/data/activities.json')
const HomeView = require('@architect/views/home')
const ConnectView = require('@architect/views/home/connect')
const LoginView = require('@architect/views/home/login')
const CheckView = require('@architect/views/home/check')
const WaitView = require('@architect/views/home/wait')
const NotFoundView = require('@architect/views/404')
const github = require('./github')
const { ConnectedTicket } = require('./connected-ticket')
const { Ticket } = require('./ticket')

async function getActivitiesWithCounts() {
  let rsvpData = await data.get({ table: 'rsvps', limit: 500 })
  return activities.map(a => {
    return {
      ...a,
      full: rsvpData.filter((r) => r.activity === a.key).length >= a.cap
    }
  })
}

// render the form
async function unauthenticated(req) {
  const { view } = req.params
  let { ticketRef } = req.session
  let { message } = req.queryStringParameters
  // non-authenticated views
  if (view === 'login') {
    return LoginView(message)
  }
  else if (view === 'check') {
    let { email } = req.queryStringParameters
    return CheckView(email)
  }
  else if (view === 'verify') {
    let { ticketRef, token } = req.queryStringParameters
    let login = await data.get({ table: 'logins', key: ticketRef })
    if (login && login.token === token && login.expires > Date.now()) {
      let session = { ticketRef }
      let location = '/home/dashboard'
      return { session, location }
    }
    else {
      return { location: `/home/login?message=${encodeURIComponent("Log-in verification failed, try again?")}` }
    }
  }
  else if (!ticketRef) {
    return { location: `/home/login?message=${encodeURIComponent("Please log-in")}` }
  }
}

// display the ticket information
async function authenticated(req) {
  let { message } = req.queryStringParameters
  const { view } = req.params
  let { ticketRef } = req.session
  let ticket = await Ticket.byKey(ticketRef)
  if (view === 'dashboard') {
    // load the RSVP (if one exists)
    let rsvp = await data.get({ table: 'rsvps', key: ticketRef })
    let activitiesWithCounts = await getActivitiesWithCounts()
    //console.log(activitiesWithCounts)
    return HomeView({ ticket, rsvp, activities: activitiesWithCounts, message })
  }
  else if (view === 'connect') {
    // if user does not have an authHash, create authHash, connHash and emailShare and attach to ticket record
    if (!ticket.auth_hash) {
      let auth_hash = crypto.createHmac("sha256", process.env.RETOOL_SECRET).update(ticket.key).digest("base64")
      let conn_hash = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
      let email_share = ticket.email
      let bad_connects = 0
      ticket = await data.set({ ...ticket, auth_hash, conn_hash, email_share, bad_connects })
    }
    const connectedTicket = new ConnectedTicket(ticket)
    const connections = await connectedTicket.connections()
    const { csv, add_connection } = req.queryStringParameters
    if (add_connection) {
      const connectToTicket = Ticket.fromConnectionHash(add_connection)
      connectedTicket.addConnection(connectToTicket)
    }
    if (csv) {
      return {
        type: 'text/csv',
        cacheControl: 'no-cache',
        body: 'name,email,linkedin,twitter,github\n' + connections.map(c => `${c.to_data.full_name},${c.to_data.email_share},${c.to_data.linkedin},${c.to_data.twitter},${c.to_data.github}`).join('\n')
      }
    }
    else {
      return ConnectView({ ticket, connections })
    }
  }
  else if (view === 'wait') {
    return WaitView()
  }
  else if (view === 'oauth') {
    let info = await github(req)
    //console.log(info)
    await data.set({ table: 'tickets', ...ticket, github: info.login, avatar: info.avatar })
    // fire event to build ticket image and place in s3
    const name = 'ticket-shared'
    const payload = { number: ticket.number }
    await arc.events.publish({ name, payload })
    return {
      location: '/home/wait'
    }
  }
}

exports.handler = arc.http.async(unauthenticated, authenticated, NotFoundView)