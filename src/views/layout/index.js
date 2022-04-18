let head = require('./head')
let footer = require('./footer')
let bodyScripts = require('./scripts')
let SponsorsContainer = require('../components/sponsors')

module.exports = function Layout ({path, title, content, socialUrl, excerpt, scripts = []}) {
  return /*html*/`
  <!doctype html>
  <!-- this conference is built by devs for devs -->
  <html lang=en>
    ${ head({ path, title, content, socialUrl, excerpt })}
    <body>
      <div id="root">
        <header>
          <nav>
           <div class="wide">
              <div id="logo"><a href="/"><img src="/images/logo_lockup-horizontal.svg" alt="logo"/></a></div>
              <div class="push"><a href="/conference">Conference</a></div>
              <div class="spacer"><a href="/sponsors/jobs">Job Board</a></div>
              <!--div class="spacer"><a href="/cfp">CFP</a></div-->
              <div class="spacer"><a href="/sponsorships">Sponsorships</a></div>
              <div class="spacer"><a href="/code-of-conduct">Code of Conduct</a></div>
              <div class="spacer"><a href="/tickets" class="buy">Tickets</a></div>
            </div>
          </nav>
        </header>
        <main id="content">
          ${ content }
          <section id="sponsors" class="landing">
            <h1>Our Sponsors</h1>
            ${ SponsorsContainer() }
            <div class="cta"><a href="/sponsorships">Sponsor Our Event</a></div>
          </section>
        </main>
        ${ footer() }
      </div>
      ${ bodyScripts({ scripts })}
    </body>
  </html>
`
}
