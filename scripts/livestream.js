const fetch = require('node-fetch')
require('dotenv').config()

/**
 * This script is used to launch the conference livestream using Mux.
 *
 * 1. Run script, this will create a Mux livestream object and connect it to both Twitter and Twitch
 * 2. Note the stream_key value that is returned
 * 3. Configure the conference live stream to send via RTMP to rtmps://global-live.mux.com:443/app using the stream_key
 * 4. Go to the Mux dashboard, click into the livestream resource, and note the public "Playback ID"
 * 5. Set the playback_id for the embedded Mux Video player
 *
 * Once you're ready to start the livestream:
 *
 * 1. Start streaming to the Mux endpoint
 * 2. Go to https://studio.twitter.com/producer/broadcasts and "Create broadcast", make it public, tweet it out
 *
 * No action for Twitch, it will automatically start streaming.
 *
 * See: https://docs.mux.com/guides/video/stream-live-to-3rd-party-platforms#2-select-a-simulcast-target-supported-by-mux
 */


async function main() {
    // create a payload for the REST API call that will initialize a livestream and simulcast it to both Twitter and Twitch
    let payload = {
        "playback_policy": [
          "public"
        ],
        "new_asset_settings": {
          "playback_policy": [
            "public"
          ]
        },
        "generated_subtitles": [
            {
              "name": "English CC (auto)",
              "passthrough": "English closed captions (auto-generated)",
              "language_code": "en-US"
            }
        ],
        "simulcast_targets" : [
          {
            "url" : "rtmps://or.pscp.tv:443/x",
            "stream_key" : process.env.TWITTER_STREAM_KEY,
            "passthrough" : "Twitter Test"
          },
          {
            "url" : "rtmp://live.twitch.tv/app/",
            "stream_key" : process.env.TWITCH_STREAM_KEY,
            "passthrough" : "Twitch Test"
          }
        ]
      }

    // call MUX API
    let response = await fetch(`https://api.mux.com/video/v1/live-streams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${ process.env.MUX_TOKEN_ID }:${ process.env.MUX_TOKEN_SECRET }`, 'binary').toString('base64')
        },
        body:    JSON.stringify(payload),
    })

    const result = await response.json()
    console.log(result)
}

main()