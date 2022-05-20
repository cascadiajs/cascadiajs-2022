let Layout = require('../layout')

module.exports = async function Index({ ticket }) {
    let clientID = process.env.GITHUB_CLIENT_ID
    let { full_name } = ticket
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Hello ${ full_name }!</h1></div></div>
            <div id="home" class="page-body narrow">
                <h3>Conference Directory</h3>
                ${ ticket.github && ticket.github !== ''
                    ? /*html*/`<p>You have been added to the Conference Directory ✅<p>
                    <p>We have also generated a <a href="/tickets/${ ticket.number }" target="_blank">virtual ticket</a> that you can share on social media. Anyone who registers via your virtual ticket page gets 10% off!</p>`
                    : /*html*/`<p>Let folks know you're attending CascadiaJS this year! We use <a target="_blank" href="https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps">Github OAuth</a> to retrieve your profile photo and add it to our Conference Directory. We will also generate a customized virtual ticket for you to share on social media!</p>
                    <div class="cta secondary"><a href="https://github.com/login/oauth/authorize?client_id=${ clientID }">Get Added to Directory</a></div>`
                }
                <h2>Need Help?</h2>
                <p>Please contact us in the <a target="_discord" href="https://discord.gg/cascadiajs">Discord</a> at #help-questions.</p>
                <form action=/home method=post>
                    <input type=hidden name=reset value=reset/>
                    <button>Log Out</button>
                </form>
            </div>
        </div>
    `
    let html = Layout({ content })
    return { html }
}
