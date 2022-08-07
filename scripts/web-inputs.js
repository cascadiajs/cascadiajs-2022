const fetch = require('node-fetch')
require('dotenv').config()

/**
 * This script is used to launch the livestream feed using Mux Web Inputs
 *
 */


async function createLivestream() {
    // create a payload for the REST API call that will initialize a livestream and simulcast it to both Twitter and Twitch
    let payload = {
        playback_policy: [
          "public"
        ],
        new_asset_settings: {
          playback_policy: [
            "public"
          ]
        }
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
    let result = await response.json()
    let livestreamId = result.data.id
    let playbackId = result.data.playback_ids[0].id

    payload = {
      url: "https://2022.cascadiajs.com/live/web-input",
      live_stream_id: livestreamId,
      auto_launch : true
    }

    response = await fetch(`https://api.mux.com/video/v1/web-inputs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${ process.env.MUX_TOKEN_ID }:${ process.env.MUX_TOKEN_SECRET }`, 'binary').toString('base64')
        },
        body:    JSON.stringify(payload),
    })
    result = await response.json()
    console.log(result.data)

    return playbackId
}

async function updateWebInputPlaybackId(env, password, webInputplaybackId) {
    let url
    if (env === 'testing') {
        url = 'http://localhost:3333'
    }
    else  {
        url = `https://${ env === 'staging' ? 'staging.' : '' }2022.cascadiajs.com`
    }
    // log-in
    let params = new URLSearchParams()
    params.append('password', password)
    let login = await fetch(`${url}/admin`, {method: 'POST', body: params, redirect: 'manual'})

    // get the session cookie
    let cookie = login.headers.get('set-cookie')

    // update the app setting
    params = new URLSearchParams()
    params.append('key', 'webInputplaybackId')
    params.append('value', webInputplaybackId)
    await fetch(`${url}/admin/settings/webInputplaybackId`, {
        method: 'POST',
        headers: { cookie },
        body:    params,
        redirect: 'manual'
    })
    console.log('Setting Updated: webInputplaybackId = ', webInputplaybackId)
}

async function main() {
    let env = process.argv[2]
    let password = process.argv[3]
    let webInputplaybackId = await createLivestream()
    await updateWebInputPlaybackId(env, password, webInputplaybackId)
}

main()
