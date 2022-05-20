const fetch = require('node-fetch')

module.exports = async function github(req) {
  try {
    let payload = {
      code: req.queryStringParameters.code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    }
    //console.log(payload)
    let response = await fetch(`https://github.com/login/oauth/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
    })
    let result = await response.json()
    //console.log(result)
    let token = result.access_token
    response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: `token ${ token }`,
        Accept: 'application/json'
      }
    })
    let user = await response.json()
    //console.log(user)
    return {
      token,
      name: user.name,
      login: user.login,
      id: user.id,
      url: user.url,
      avatar: user.avatar_url
    }
  } catch (err) {
    return {
      error: err.message
    }
  }
}