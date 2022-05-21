let Layout = require('../layout')

module.exports = async function() {
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Hang tight while we build your Virtual Ticket</h1></div></div>
            <div class=page-body class=narrow>
                <p style="text-align:center"><img src="/images/illustrations/feature-coffee.gif"/></p>
            </div>
        </div>
    `
    let html = Layout({ content, rawHead: '<meta http-equiv="refresh" content="5;url=/home/dashboard" />' })
    return { html }
}
