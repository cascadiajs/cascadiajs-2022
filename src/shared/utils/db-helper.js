const data = require('@begin/data')

// helper to retrieve all documents for a given table
async function getAll(table, cursor) {
    let result = await data.get({ table, cursor })
    if (result.cursor) {
        return result.concat(await getAll(table, result.cursor))
    }
    else {
        return result
    }
}

module.exports = {
    getAll
}