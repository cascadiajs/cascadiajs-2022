module.exports = function Embed({ playbackId  }) {
    playbackId = playbackId || 'v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM'
    let html = /*html*/`
    <html>
        <body>
            <mux-player
                stream-type="live"
                playback-id="${ playbackId }"
                metadata-video-title="CascadiaJS 2022 Livestream"
                metadata-viewer-user-id="gather-embed"
                muted="true"
                autoplay="any"
                default-hidden-captions>
            </mux-player>
            <script src="https://unpkg.com/@mux/mux-player"></script>
        </body>
    </html>
    `
    return { html }
}


