const fetch = require('node-fetch')

async function send_email({ email, transactional_message_id, message_data }) {
    let payload = { to: email, transactional_message_id, message_data, identifiers: { email }}
    // call customer.io API
    let response = await fetch(`https://api.customer.io/v1/send/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ process.env.CUSTOMERIO_TOKEN }` 
        },
        body: JSON.stringify(payload),
    })
    return await response.json()
}

module.exports = {
    send_email
}

