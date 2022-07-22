let LiveLayout = require('../layout/live')
let SponsorsContainer = require('../components/sponsors')

module.exports = function Expo({ links }) {
    let gather = links.find(l => l.key === 'gather')
    let content = /*html*/`
    <div id="page">
    <div class="page-title">
      <div><h1>Expo Hall</h1></div>
    </div>
    <div class="page-body">
      <p>Connect with our event sponsors during the breaks! Chat face-to-face on Gather or stick to text on our Discord.</p>
      <br/>
      <div>
        <span class="cta"><a target="_discord" href="https://discord.gg/cascadiajs">Join Discord</a></span>
        <span class="cta"><a target="_gather" href="${ gather?.url }">Join Gather</a></span>
      </div>
      ${ SponsorsContainer() }
    </div>
  </div>
    `
    let html = LiveLayout({ content, view: 'expo' })
    return { html }
}


