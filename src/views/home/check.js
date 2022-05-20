let Layout = require('../layout')

module.exports = async function({ email }) {
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Check Your Email</h1></div></div>
            <div class=page-body class=narrow>
                <p>We sent a magic link to ${ email }, please click it to complete the log-in process.</p>
            </div>
        </div>
    `
    let html = Layout({ content })
    return { html }
}
