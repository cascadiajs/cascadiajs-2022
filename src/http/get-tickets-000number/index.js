let arc = require('@architect/functions')
const data = require('@begin/data')
const TicketView = require('@architect/views/ticket')
const SocialView = require('@architect/views/ticket/social')
const NotFoundView = require('@architect/views/404')

// display the ticket information
async function Ticket(req) {
  let { number } = req.params
  let { social } = req.queryStringParameters
  let ticketData = await data.get( {table: 'tickets', limit: 1000 })
  let ticket
  for (let i in ticketData) {
    let record = ticketData[i]
    if (record.number == number && record.github) {
      ticket = record
    }
  }
  //console.log(ticket)
  if (ticket) {
    if (social != undefined) {
      return SocialView({ ticket })
    }
    else {
      let socialUrl = `${ process.env.BEGIN_STATIC_ORIGIN }/ticket-${ ticket.number }.png`
      return TicketView({ ticket, socialUrl })
    }
  }
  else {
    return NotFoundView({ req })
  }
}

exports.handler = arc.http.async(Ticket)