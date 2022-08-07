let Layout = require('../layout/web-input')

module.exports = function Live({ playbackId  }) {
    playbackId = playbackId || 'v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM'
    let content = /*html*/`
    <div id="live" class="web-input">
        <section id="stream"> 
            <div id="stream-video">
                <mux-player
                    stream-type="live"
                    playback-id="${ playbackId }"
                    metadata-video-title="CascadiaJS 2022 Livestream"
                    metadata-viewer-user-id="web-input"
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
                        src="https://player.twitch.tv/?channel=cascadiajs&parent=localhost&parent=2022.cascadiajs.com&muted=true"
                        height="100%"
                        width="100%"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
            <div id="now-and-next">
                <h2>Happening Now</h2>
                <div id="current-agenda">Loading...</span></div>
                <h2>Coming Up Next</h2>
                <div id="next-agenda">Loading...</div>
            </div>
        </section>
    </div>
    <div id="mux-sponsor" style="height:281px;width:100%;text-align:center;position:relative">
        <span style="vertical-align:middle;height:100%;display:inline-block"></span>
        <img src="/images/sponsors/livestream-powered.png"/>
        <emote-widget class="web-input" talk-id="cjs22-brian" open="false"></emote-widget>
    </div>
    `
    let html = Layout({ content, view: 'live', scripts: ['https://unpkg.com/@mux/mux-player', '/js/emote.js', '/js/sounds.js','/js/agenda.js', '/js/web-input.js'] })
    return { html }
}
