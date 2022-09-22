const data = require('@begin/data')

class Ticket {
  static async byKey(key) {
    return await data.get({ table: 'tickets', key })
  }

  static async allTickets() {
    return data.get({ table: 'tickets', limit: 1000 })
  }

  static async fromConnectionHash(connectionHash) {
    const tickets = await Ticket.allTickets()
    return tickets.find((ticket) => ticket.conn_hash === connectionHash)
  }
}

module.exports = {
  Ticket
}