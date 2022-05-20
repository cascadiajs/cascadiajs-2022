let Layout = require('../layout')

module.exports = async function Index({ ticket, socialUrl }) {
    let { full_name } = ticket
    let content = /*html*/ `
        <div id="landing">
            <section id="promo" class="landing" style="background:#ff9966">
                <h1>Join ${ full_name || "us" } at CascadiaJS 2022!</h1>
                <div style="text-align: center;margin:32px 0 8px 0;"><img src="${ socialUrl }" width="500"/></div>
                <h2>Use promo code FAMILY_REUNION for 10% off a ticket!</h2>   
                <div class="cta"><a href="/tickets?discount=FAMILY_REUNION">Buy Ticket</a></div>
            </section>
            <section id="features" class="landing">
                <div id="features-container">
                    <div class="feature">
                        <div><img src="/images/illustrations/feature-venue.gif" alt="illustration of Sunriver Resort"/></div>
                        <h2><a href="/conference/attend#lodging">Sunriver Resort</a></h2>
                        <p>Located just outside of Bend, this is one of the most beautiful resorts in the PacNW and is the perfect place to bring us all back together for an in-person event.</p>
                    </div>
                    <div class="feature">
                        <div><img src="/images/illustrations/feature-family.gif" alt="illustration of an icecream cone"/></div>
                        <h2><a href="/conference">Family Friendly</a></h2>
                        <p>In addition to the fun at the resort (pool, bikes, etc) we will be providing FREE child care so that you can bring the whole family without missing any of the fun.</p>
                    </div>
                    <div class="feature">
                        <div><img src="/images/illustrations/feature-talks.gif" alt="illustration of a microphone"/></div>
                        <h2><a href="/speakers">22 Awesome Speakers</a></h2>
                        <p>We are being joined by a wonderful line-up of speakers covering everything from the latest in the web and Node.js to building a more inclusive tech industry.</p>
                    </div>
                    <div class="feature">
                        <div><img src="/images/illustrations/feature-workshops.gif" alt="illustration of merit badge"/></div>
                        <h2><a href="/schedule">Hands-on Workshops</a></h2>
                        <p>Running parallel to the talks, there will be hands-on workshops to choose from if you care to roll-up your sleeves and do some coding.</p>
                    </div> 
                    <div class="feature">
                        <div><img src="/images/illustrations/feature-allinclusive.png" alt="illustration of a meal"/></div>
                        <h2><a href="/tickets">All Inclusive</a></h2>
                        <p>Your ticket includes a Welcome Reception, 3 meals a day for 2 days, 2 awesome parties and a Farewell Brunch!</p>
                    </div>
                    <div class="feature">
                        <div><img src="/images/illustrations/feature-activities.gif" alt="illustration of a pickleball racquet"/></div>
                        <h2><a href="/conference/activities">Outdoor Activities</a></h2>
                        <p>On the afternoon of the first day, we will cut talks and workshops short and spend an afternoon outside having fun!</p>
                    </div>
                    <div class="feature">
                        <div><img src="/images/illustrations/feature-jobfair.gif" alt="illustration of a Help Wanted sign"/></div>
                        <h2><a href="/conference/job-fair">Job Fair</a></h2>
                        <p>After dinner on Day One, we are hosting a Job Fair to connect folks to great companies that are hiring!</p>
                    </div>
                    <div class="feature">
                        <div><img src="/images/illustrations/feature-startup.gif" alt="illustration of a unicorn"/></div>
                        <h2><a href="/conference/startup-fair">Startup Fair</a></h2>
                        <p>After dinner on Day Two, we are hosting a Startup Fair to showcase exciting, new developer APIs and tools!</p>
                    </div>
                </div>       
            </section>
        </div>`
    let html = Layout({ content, title: `Join ${ ticket.full_name } at CascadiaJS 2022`, socialUrl, path: `/tickets/${ ticket.number }` })
    return { html }
}
