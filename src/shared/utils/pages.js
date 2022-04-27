let exists = require('fs').existsSync
let join = require('path').join

// return true if the markdown or HTML file exists, false otherwise
function pageExists(path) {
    let page = path.substr(1)
    let md = join(process.cwd(), 'node_modules', '@architect', 'views', 'content', `${ page }.md`)
    let html = join(process.cwd(), 'node_modules', '@architect', 'views', 'content', `${ page }.html`)
    return exists(md) || exists(html)
}

module.exports = {
    pageExists
}