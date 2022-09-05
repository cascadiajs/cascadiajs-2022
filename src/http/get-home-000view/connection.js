const data = require('@begin/data')
let { getAll } = require('@architect/shared/utils/db-helper')

class Connection {
  static async allConnections() {
    return await getAll('connections')
  }

  static async connectionsForTicketKey(ticketKey) {
    const allConnections = await Connection.allConnections()
    return allConnections.filter((connections) => connections.from === ticketKey)
  }

  static async addConnection(fromTicket, toTicket) {
    const fromKey = fromTicket.key
    const toKey = toTicket.key
    await data.set({ table: 'connections', key: `${fromKey}-${toKey}`, from: fromKey, to: toKey })
    await data.set({ table: 'connections', key: `${toKey}-${fromKey}`, from: toKey, to: fromKey })
  }

  static async canConnect(fromTicket, toTicket) {
    const ticketsExist = fromTicket && toTicket
    const underConnectionLimit = fromTicket.bad_connects < 10
    return ticketsExist && underConnectionLimit
  }
}

module.exports = {
  Connection
}