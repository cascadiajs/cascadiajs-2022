let arc = require('@architect/functions')
const data = require('@begin/data')
const HomeView = require('@architect/views/home')
const LoginView = require('@architect/views/home/login')
const CheckView = require('@architect/views/home/check')
const WaitView = require('@architect/views/home/wait')
const NotFoundView = require('@architect/views/404')
const github = require('./github')

// render the form
async function unauthenticated(req) {
  const { view } = req.params
  let { ticketRef } = req.session
  let { message, email } = req.queryStringParameters
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
    return HomeView(ticket)
  }
  else if (view === 'wait'){
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