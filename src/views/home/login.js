let Layout = require('../layout')

module.exports = async function(message = undefined) {
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Log-in to CascadiaJS 2022</h1></div></div>
            <div class=page-body class=narrow>
                ${ message ? `<span class="highlight error">${ message }</span>` : '' }
                <p>Enter the email address you used when registering for your ticket, and we will send you a magic link to use to complete the log-in process.</p>
                <form action=/home/login method=post>
                    <input style="width:50%;" type=text placeholder="foo.bar@baz.com" name=email>
                    <button>Submit</button>
                </form>
                <h3>Troubleshooting</h3>
                <p>If you're having trouble finding that email, search for emails from "support@tito.io" and the subject line "Your CascadiaJS 2022 Ticket".</p>
                <p>If you no longer have access to the email address you used when you registered your ticket, please reach out to us on <a target="_blank" href="https://discord.gg/cascadiajs">Discord</a> in #help-questions for assistance</p>
            </div>
            
        </div>
    `
    let html = Layout({ content })
    return { html }
}
