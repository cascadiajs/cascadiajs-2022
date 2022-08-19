let LiveLayout = require('../layout/live')
let SponsorsContainer = require('../components/sponsors')

module.exports = function Expo() {
    let content = /*html*/`
    <div id="page">
    <div class="page-title">
      <div class="wide"><h1>Expo Hall</h1></div>
    </div>
    <div class="page-body wide">
      <p>Connect with our event sponsors during the breaks! Chat face-to-face on Gather or stick to text on our Discord.</p>
      <br/>
      <div>
        <span class="cta"><a target="_discord" href="https://discord.gg/cascadiajs">Join Discord</a></span>
        <span class="cta"><a target="_gather" href="https://app.gather.town/events/DLM6I5xJNNbT62oqPaqa">Join Gather</a></span>
      </div>
      ${ SponsorsContainer() }
    </div>
  </div>
    `
    let html = LiveLayout({ content, view: 'expo' })
    return { html }
}


