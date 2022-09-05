const data = require('@begin/data')
const { Connection } = require('./connection')
const { Ticket } = require('./ticket')

class ConnectedTicket {
  constructor(ticket) {
    this._ticket = ticket
  }

  async connections() {
    const connections = await Connection.connectionsForTicketKey(this._ticket.key)
    const joinedToConnections = connections.map((connection) => this._joinToConnection(connection))
    return Promise.all(joinedToConnections)
  }

  async addConnection(toTicket) {
    const canConnect = await Connection.canConnect(this._ticket, toTicket)
    if (!canConnect) {
      await this._incrementBadConnection()
      return
    }
    await Connection.addConnection(this._ticket, toTicket)
  }

  async _incrementBadConnection() {
    await data.incr({ table: 'tickets', key: this._ticket.key, prop: 'bad_connects' })
  }

  async _joinToConnection(connection) {
    const to_data = await Ticket.byKey(connection.to)
    return {
      ...connection,
      to_data
    }
  }
}

module.exports = {
  ConnectedTicket
}