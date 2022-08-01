const fetch = require('node-fetch')

async function main() {
    let payload = {
        "to": "carter.rabasa+foo@gmail.com",
        "transactional_message_id": "2",
        "message_data": {
        "customer": {
            "first_name": "Carter"
        },
        "greeting": "Hello, Cascadian!"
        },
        "identifiers": {
            "email": "carter@cascadiajs.com"
        }
    }

    // call customer.io API
    let response = await fetch(`https://api.customer.io/v1/send/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ process.env.CUSTOMERIO_TOKEN }`
        },
        body:    JSON.stringify(payload),
    })

    const result = await response.json()
    console.log(result)
}

main()