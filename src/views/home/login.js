let Layout = require('../layout')

module.exports = async function(message = undefined ) {
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Log-in to CascadiaJS 2022</h1></div></div>
            <div class=page-body class=narrow>
            ${ message ? `<div class="highlight error">${ message }</div>` : '' }
                <p>Enter the email address you used when registering for your ticket, and we will send you a magic link to use to complete the log-in process.</p>
                <form action=/home method=post>
                    <input style="width:50%;" type=text placeholder="foo.bar@baz.com" name=email>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    `
    let html = Layout({ content })
    return { html }
}
