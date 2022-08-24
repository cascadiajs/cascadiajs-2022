let head = require('./head')
let bodyScripts = require('./scripts')

module.exports = function Layout ({title = 'CascadiaJS 2022 - Live Stream', content, scripts }) {
  return /*html*/`
  <!doctype html>
  <html lang=en>
    ${ head({ title, content })}
    <body style="height:1070px;max-height:1070px;width:1910px;max-width:1910px;">
      <div style="height:1070px;max-height:1070px;width:1910px;max-width:1910px;">
      <main id="content">
        ${ content }
      </main>
      </div>
      ${ bodyScripts({ scripts })}
    </body>
  </html>
`
}
