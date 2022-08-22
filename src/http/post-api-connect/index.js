const data = require('@begin/data')

exports.handler = async function(req) {
  let { auth_hash, conn_hash } = JSON.parse(req.body)
  if (auth_hash && conn_hash) {
    // find user A using auth_hash
    let tickets = await data.get({ table: 'tickets', limit: 1000 })
    let a = tickets.find((t) => t.auth_hash === auth_hash)
    if (a) {
      if (a.bad_connects < 10) {
        // find user B using the conn_hash
        let b = tickets.find((t) => t.conn_hash === conn_hash)
        if (b) {
          // create mutual connection to each other in the connections table
          await data.set({ table: 'connections', key: `${ a.key}-${ b.key }`, from: a.key, to: b.key })
          await data.set({ table: 'connections', key: `${ b.key}-${ a.key }`, from: b.key, to: a.key })
          return { status: "OK" }
        }
        else {
          // User A provided an invalid conn_hash, increment bad_connects value
          await data.incr({ table: 'tickets', key: a.key, prop: 'bad_connects'})
          return { status: 403, message: "Invalid Connection Attempt" }
        }
      }
      else {
        return { status: 403, message: "Too Many Invalid Connection Attempts" }
      }
    }
    else {
      return { status: 403, message: "Unauthorized Connection Attempt" }
    }
  }
  else {
    return { status: 400, message: "Bad Request" }
  }
}
