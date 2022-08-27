let head = require('./head')
let footer = require('./footer')
let bodyScripts = require('./scripts')

module.exports = function Layout ({title = 'CascadiaJS 2022 - Home', content, socialUrl, view, scripts }) {
  return /*html*/`
  <!doctype html>
  <html lang=en>
    ${ head({ title, content, socialUrl })}
    <body>
      <div id="root">
        <header id="live-header">
          <div id="logo">
            <a href="/"><img src="/images/logo-green.svg" alt="CascadiaJS logo"/></a>
          </div>
          <div id="live-nav">
            <div><a class="${ view === 'dashboard' ? 'selected': ''}" href="/home/dashboard">Dashboard</a></div>
            <div><a class="${ view === 'connect' ? 'selected': ''}" href="/home/connect">Connect</a></div>
          </div>
        </header>
        <main id="content">
          ${ content }
        </main>
        ${ footer() }
      </div>
      ${ bodyScripts({ scripts })}
    </body>
  </html>
`
}
