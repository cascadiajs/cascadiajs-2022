let head = require('./head')
let footer = require('./footer')
let bodyScripts = require('./scripts')

module.exports = function Layout ({title = 'CascadiaJS 2022 - Live Stream', content, socialUrl, view, scripts }) {
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
            <div><a class="${ view === 'live' ? 'selected': ''}" href="/live/stream">Live</a></div>
            <div><a class="${ view === 'expo' ? 'selected': ''}" href="/live/expo">Expo</a></div>
            <div><a class="${ view === 'jobs' ? 'selected': ''}" href="/live/jobs">Jobs</a></span></div>
            <div><a href="/conf/handbook" target="_handbook">Handbook</a></div>
          </div>
          ${ view === 'live' ? /*html*/`
          <div id="settings">
            <div class="label">Captions</div>
            <div>
              <label class="switch">
                <input id="stream-text-button" type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div id="settings-label-clapping" class="label">Clapping Audio</div>
            <div id="settings-switch-clapping">
              <label class="switch">
                <input id="clapping-audio-button" type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
          </div>
          `
          : ''}

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
