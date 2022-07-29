let LiveLayout = require('../layout/live')
let { DayOne, DayTwo } = require('../components/schedule')

module.exports = function Live({ speakers, ticket, links }) {
    let isDayOne = (new Date() - new Date('2022-09-01T04:00:00.0Z') < 0)
    let dayContainer = (isDayOne ? DayOne({ speakers, ticket, links }) : DayTwo({ speakers, ticket, links }))
    let playbackId = (isDayOne ? 'v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM' : 'v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM')
    let content = /*html*/`
    <div id="live">
        <section id="stream"> 
            <div id="stream-video">
                <mux-player
                    stream-type="live"
                    playback-id="${ playbackId }"
                    metadata-video-title="Test Live Stream"
                    metadata-viewer-user-id="user-id-007"
                    muted="true"
                    default-hidden-captions>
                </mux-player>
                <h2 class="sponsor">Livestream by <img src="/images/sponsors/mux.png"/></h2>
            </div>
            <div id="stream-text" class="stream-text-true">
                <iframe id="stFrame" 
                src="//www.streamtext.net/player?event=CascadiaJS&header=true&footer=false&scroll=false&chat=false" 
                style="width:100%;height:95%" frameborder="0"></iframe>
            </div>
        </section>
        <section id="right-pane">
            <div id="graphic-recording">
                <div class="video-container">
                    <iframe
                        src="https://player.twitch.tv/?channel=cascadiajs&parent=localhost&parent=2021.cascadiajs.com"
                        height="100%"
                        width="100%"
                        frameborder="no"
                        scrolling="no"
                        allowfullscreen="allowfullscreen">
                    </iframe>
                </div>
                <h2 class="sponsor">Illustrations by <img src="/images/sponsors/netlify.svg"/></h2>
            </div>
            <div id="emote">
                <emote-widget talk-id="cjs22-brian" open="false"></emote-widget>
                <!--audio src="/sounds/applause-8.mp3"></audio-->
            </div>
        </section>
    </div>
    <div id="live-more">
        <div id="conf-schedule">
            ${ dayContainer }
        </div>
    </div>
    `
    let html = LiveLayout({ content, view: 'live', scripts: ['https://unpkg.com/@mux/mux-player', '/js/emote.js', '/js/live.js'] })
    return { html }
}


