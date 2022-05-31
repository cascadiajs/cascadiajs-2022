let fs = require('fs')
let exists = fs.existsSync
let read = fs.readFileSync
let { marked } = require('marked')
let fm = require('front-matter')
let join = require('path').join
let Layout = require('./layout')
let SocialLayout = require('./layout/social')

function MarkdownTemplate({ title, body }) {
  return /*html*/ `
    <div id="page">
      <div class="page-title">
        <div><h1>${title}</h1></div>
      </div>
      <div class="page-body">
        ${marked.parse(body)}
      </div>
    </div>`
}

/**
 * Page view: catchall for all other pages, authored either in markdown or HTML
 */
module.exports = async function Page(req) {
  let { path } = req
  let page = path.substr(1)
  let { social } = req.queryStringParameters
  let type = 'markdown'
  let doc = join(__dirname, 'content', `${page}.md`)
  if (!exists(doc)) {
    doc = join(__dirname, 'content', `${page}.html`)
    type = 'html'
  }

  // Read the file
  doc = read(doc).toString()

  // pull out any front-matter key/values
  let { attributes, body } = fm(doc)
  // check for re-direct in the font-matter
  let location = attributes.location
  if (location) {
    return { location }
  }
  // else render content
  else {
    let title = attributes.title || 'The JavaScript Conference for the Pacific Northwest'
    let excerpt = attributes.excerpt
    let caption = attributes.caption
    let html
    let content

    if (social !== undefined) {
      let image = attributes.image
      let header = title
      html = SocialLayout({ image, header, excerpt, caption })
    }
    else {
      // HACK - to enable some dynamic/runtime content in Markdown/HTML pages
      if (req.queryStringParameters.discount) {
        body = body.replace(/\$\{\sDISCOUNT_CODE\s\}/g, `discount-code="${ req.queryStringParameters.discount }"`)
      }
      if (type === 'markdown') {
        content = MarkdownTemplate({ title, body })
      } else {
        content = body
      }
      let socialUrl = `/social?path=${ req.path }`
      // if its the ticketing page, load the Tito JS script
      let scripts = []
      if (page === 'tickets') {
        scripts.push('https://js.tito.io/v2/with/gtag')
        scripts.push('/js/tito.js')
      }
      html = Layout({ path, title, content, socialUrl, excerpt, scripts })
    }

    return { html }
  }
}
