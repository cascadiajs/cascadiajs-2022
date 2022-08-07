let LiveLayout = require('../layout/live')
let { DayOne, DayTwo } = require('../components/schedule')

module.exports = function Live({ speakers, ticket, links, playbackId  }) {
    let isDayOne = (new Date() - new Date('2022-09-01T04:00:00.0Z') < 0)
    let dayContainer = (isDayOne ? DayOne({ speakers, ticket, links }) : DayTwo({ speakers, ticket, links }))
    playbackId = playbackId || 'v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM'
    let content = /*html*/`
    <div id="live">
        <section id="stream"> 
            <div id="stream-video">
                <mux-player
                    stream-type="live"
                    playback-id="${ playbackId }"
                    metadata-video-title="CascadiaJS 2022 Livestream"
                    metadata-viewer-user-id="${ ticket ? ticket.key : 'anonymous' }"
                    muted="true"
                    autoplay="any"
                    default-hidden-captions>
                </mux-player>
            </div>
        </section>
        <section id="right-pane">
            <div id="graphic-recording">
                <div class="video-container">
                    <iframe
                        src="https://player.twitch.tv/?channel=cascadiajs&parent=localhost&parent=2022.cascadiajs.com"
                        height="100%"
                        width="100%"
                        frameborder="no"
                        scrolling="no"
                        allowfullscreen="allowfullscreen">
                    </iframe>
                </div>
            </div>
            <div id="mux-sponsor">
                <p><img src="/images/sponsors/livestream-powered.png"/></p>
            </div>
            <div id="now-and-next">
                <p>Happening Now: <span id="current-agenda">Loading...</span></p>
                <p>Coming Up Next: <span id="next-agenda">Loading...</span></p>
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
    let html = LiveLayout({ content, view: 'live', scripts: ['https://unpkg.com/@mux/mux-player', '/js/emote.js', '/js/sounds.js','/js/agenda.js'] })
    return { html }
}


