let head = require('./head')
let bodyScripts = require('./scripts')

module.exports = function Layout ({title, content, socialUrl, excerpt, scripts = []}) {
  return /*html*/`
  <!doctype html>
  <!-- this conference is built by devs for devs -->
  <html lang=en>
    ${ head({ title, content, socialUrl, excerpt })}
    <body>
      <div id="root">
        <header>
        </header>
        <main id="content">
          ${ content }
        </main>
      </div>
      ${ bodyScripts({ scripts })}
    </body>
  </html>
`
}
