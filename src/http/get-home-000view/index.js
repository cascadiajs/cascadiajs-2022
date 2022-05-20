let arc = require('@architect/functions')
const data = require('@begin/data')
const HomeView = require('@architect/views/home')
const LoginView = require('@architect/views/home/login')
const CheckView = require('@architect/views/home/check')
const NotFoundView = require('@architect/views/404')
const github = require('./github')

// render the form
async function unauthenticated(req) {
  const { view } = req.params
  let { ticketRef } = req.session
  // non-authenticated views
  if (view === 'login') {
    return LoginView()
  }
  else if (view === 'check') {
    return CheckView({ email: req.queryStringParameters.email })
  }
  else if (view === 'verify') {
    let { ticketRef, token } = req.queryStringParameters
    let login = await data.get( { table: 'logins', key: ticketRef })
    if (login && login.token === token && login.expires > Date.now()) {
      let session = { ticketRef }
      let location = '/home/dashboard'
      return { session, location }
    }
    else {
      return { location: `/home/login?message=${ encodeURIComponent("Log-in verification failed, try again?") }`} 
    }
  }
  else if (!ticketRef) {
    return { location: `/home/login?message=${ encodeURIComponent("Please log-in") }`} 
  }
}

// display the ticket information
async function authenticated(req) {
  const { view } = req.params
  let { ticketRef } = req.session
  let ticket = await data.get( { table: 'tickets', key: ticketRef })
  if (view === 'dashboard') {
    return HomeView({ ticket })
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
      location: '/home/dashboard'
    }
  }
}

exports.handler = arc.http.async(unauthenticated, authenticated, NotFoundView)