const fetch = require('node-fetch')
require('dotenv').config()

async function fixLivestream() {

    // call MUX API
    let response = await fetch(`https://api.mux.com/video/v1/web-inputs/DSwls2600g00mzxeKDV6mjaIotlk00M2QjP02vUIbajqJrc/launch`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${ process.env.MUX_TOKEN_ID }:${ process.env.MUX_TOKEN_SECRET }`, 'binary').toString('base64')
        },
        //body:    JSON.stringify(payload),
    })
    let result = await response.json()
    console.log(result)
}

async function main() {
    //let env = process.argv[2]
    //let password = process.argv[3]
    await fixLivestream()
}

main()
