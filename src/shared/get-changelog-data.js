let join = require('path').join
let fs = require('fs')
let readDir = fs.readdirSync
let readFile = fs.readFileSync
let fm = require('front-matter')
let sortDesc = require('./utils/sort').sortDesc

module.exports = function getAll () {
    let path = join(process.cwd(), 'node_modules', '@architect', 'views', 'content', 'changelog')
    let files = readDir(path)
    let posts = files
        .map(file => {
            let doc = readFile(`${path}/${file}`).toString()
            let { attributes } = fm(doc)
            let stub = file.split('.')[0]
            return { file, stub, ...attributes }
        })
        .filter(post => post.published)

    return sortDesc(posts, 'published')
}
