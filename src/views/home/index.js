let Layout = require('../layout')

module.exports = async function Index({ ticket, rsvp, activities, message }) {
    let clientID = process.env.GITHUB_CLIENT_ID
    let { full_name, number, release_slug } = ticket
    let isInPerson = process.env.TITO_INPERSON_SLUGS.split(',').indexOf(release_slug) >= 0
    //console.log(process.env.TITO_INPERSON_SLUGS, ticket)
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Hello ${ full_name }!</h1></div></div>
            <div id="home" class="page-body narrow">
                ${ message ? `<p><span class="highlight warning">${ message }</span></p>` : ``}
                <h2>Conference Directory</h2>
                ${ ticket.github && ticket.github !== ''
                    ? /*html*/`<p>You have been added to the Conference Directory ✅<p>
                    <h2>Virtual Ticket</h2>
                    <p><img src="${ process.env.BEGIN_STATIC_ORIGIN }/ticket-${ number }.png" alt="image of virtual ticket" width="500"/></p>
                    <p>Anyone who registers via your virtual ticket page gets 10% off!</p>
                    <p>
                        <a target="_blank" href="https://twitter.com/intent/tweet?text=${ encodeURIComponent(`I just bought a ticket to #CascadiaJS 2022! If you register using my virtual ticket link, you'll save 10%!\n\nhttps://2022.cascadiajs.com/tickets/${ number }`) }">Share on Twitter</a> 
                        <a target="_blank" href="/tickets/${ number }">Direct Link</a>
                    </p>
                    `
                    : /*html*/`<p>Let folks know you're attending CascadiaJS this year! We use <a target="_blank" href="https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps">Github OAuth</a> to retrieve your profile photo and add it to our Conference Directory. We will also generate a customized virtual ticket that will include a discount code for you to share with your friends!</p>
                    <div class="cta secondary"><a href="https://github.com/login/oauth/authorize?client_id=${ clientID }">Get Added to Directory</a></div>`
                }
                ${ isInPerson
                    ? /*html*/`<h2>Activity Track RSVP</h2>
                        <p>Choose your own adventure and register to your Activity of choice! The Activity Track will take place on the afternoon of Day One, August 31. Please <a href="/conference/activities">review the descriptions</a> of each activity before you make your selection. You can "un-register" anytime and make a new selection if there are spots open.</p>
                        <table>
                            <tr><th>Activity</th></tr>
                            ${ activities.map((a) => `
                            <tr>
                                <td>${ a.name }</td>
                                <td>
                                    <form action=/home/rsvp method=post>
                                        <input type=hidden name=activityKey value=${ a.key } />
                                    ${ rsvp
                                        ? rsvp.activity === a.key
                                            ? `<input type=submit name=unregister value="Un-Register" />`
                                            : a.full
                                                ? `<button disabled>Max Limit Reached</button>`
                                                : `<button disabled>Register</button>`
                                        :  a.full
                                            ? `<button disabled>Max Limit Reached</button>`
                                            : `<input type=submit name=register value=Register />`
                                    }
                                    </form>
                                </td>
                            </tr>
                            `).join('')}
                        </table>`
                    : ``
                }
                <h2>Need Help?</h2>
                <p>Please contact us in the <a target="_blank" href="https://discord.gg/cascadiajs">Discord</a> at #help-questions.</p>
                <form action=/home/login method=post>
                    <input type=hidden name=reset value=reset/>
                    <button>Log Out</button>
                </form>
            </div>
        </div>
    `
    let html = Layout({ content })
    return { html }
}
