let LiveLayout = require('../layout/live')
let { DayOne, DayTwo } = require('../components/schedule')

module.exports = function Live({ speakers, ticket, playbackId  }) {
    let isDayOne = (new Date() - new Date('2022-09-01T04:00:00.0Z') < 0)
    let dayContainer = (isDayOne ? DayOne({ speakers, ticket }) : DayTwo({ speakers, ticket }))
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
                        src="https://player.twitch.tv/?channel=ashtonmindseye&parent=localhost&parent=2022.cascadiajs.com"
                        height="100%"
                        width="100%"
                        frameborder="no"
                        scrolling="no"
                        allowfullscreen="allowfullscreen">
                    </iframe>
                </div>
            </div>
            <div id="now-and-next">
                <h3>Happening Now</h3>
                <div id="current-agenda">Loading...</span></div>
                <h3>Coming Up Next</h3>
                <div id="next-agenda">Loading...</div>
            </div>
            <div id="emote">
                <emote-widget talk-id="cjs22-brian" open="false"></emote-widget>
                <!--audio src="/sounds/applause-8.mp3"></audio-->
            </div>
        </section>
    </div>
    <div id="mux-sponsor" style="text-align:center;position:relative">
        <span style="vertical-align:middle;height:100%;display:inline-block"></span>
        <img src="/images/sponsors/livestream-powered.png"/>
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


