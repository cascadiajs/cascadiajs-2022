const fetch = require('node-fetch')
const fs = require('fs')

async function uploadSpeakers(env, data, password) {
    // set-up the API URL
    let url
    if (env === 'testing') {
        url = 'http://localhost:3333'
    }
    else  {
        url = `https://${ env === 'staging' ? 'staging.' : '' }2022.cascadiajs.com`
    }

    // read the proper file
    let speakerData = JSON.parse(fs.readFileSync(data).toString())

    // log-in
    const params = new URLSearchParams()
    params.append('password', password)
    let login = await fetch(`${url}/admin`, {method: 'POST', body: params, redirect: 'manual'})

    // get the session cookie
    let cookie = login.headers.get('set-cookie')

    // upload the speakers
    let speakers = await fetch(`${url}/speakers/upload`, {
        method: 'POST',
        headers: {cookie, 'Content-Type': 'application/json'},
        body:    JSON.stringify(speakerData),
    })
    const result = await speakers.json()
    console.log(result)
}

function main() {
    let env = process.argv[2]
    let data = process.argv[3]
    let password = process.argv[4]
    uploadSpeakers(env, data, password)
}

main()