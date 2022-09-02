let Layout = require('./layout')
let getDirectoryData = require('../shared/get-directory-data')
let SpeakersContainer = require('./components/speakers')
let OrganizersContainer = require('./components/organizers')

const CLASSIC_PHOTOS = [
    {
        image: 'cjs14-karaoke.jpg',
        caption: 'Voicebox Karaoke, 2014'
    },
    {
        image: 'cjs15-by-the-water.jpg',
        caption: 'Semiahmoo Resort, 2015'
    },
    {
        image: 'cjs19-photo-booth-2.jpg',
        caption: 'Closing Party, 2019'
    },
    {
        image: 'cjs12-kids.jpg',
        caption: 'Carter & Family, 2012'
    },
    {
        image: 'cjs13-hacker-olympics.jpg',
        caption: 'Hacker Olympics, 2013'
    },
    {
        image: 'cjs16-dog.jpg',
        caption: 'Happy Dog, 2016'
    }
]


let randomIntFromInterval = function(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let randomAngle = function() {
    return randomIntFromInterval(5, 15) * (Math.random() > 0.5 ? 1 : -1)
}

let randomThreePhotos = function() {
    return CLASSIC_PHOTOS.sort(()=> Math.random() - 0.5).slice(0, 3)
}

let Template = function ({ speakersContainer, organizersContainer, directoryContainer }) {
    let content = /*html*/`
    <div id="landing">
        <section id="hero">
            <img src="/images/bend/hero-photo.jpg" alt="Beautiful Bend, OR"/>
            <div id="event-title"><img src="/images/event-logo.svg"/></div>
            <div id="classic-photos">
            ${ randomThreePhotos().map(p => { return /*html*/`
                <div class="classic-photo-container">
                    <div class="classic-photo" style="transform: rotate(${ randomAngle() }deg)">
                        <div class="classic-photo-image"><img src="/images/classics/${ p.image }"/></div>
                        <div class="classic-photo-caption">${ p.caption }</div>
                    </div>
                </div>    
            `}).join('')}
            </div>
        </section>
        <section id="promo-video" style="padding:16px">
            <div><img src="/images/cjs22-family-photo.jpg" alt="2022 family photo"/></div>
        </section>
        <!--section id="banner">
            <div class="banner-item">
                <div class="banner-item-metric">Virtual</div>
                <p>Can't attend in-person? No problem, join us on-line!</p>
                <div class="cta secondary"><a href="/conference/virtual">Learn More</a></div>
            </div>
            <div class="banner-item">
                <div class="banner-item-metric">Act Fast</div>
                <p>RSVP for the Activity Track option of your choice before it fills up!</p>
                <div class="cta secondary"><a href="/conference/activities">RSVP</a></div>
            </div>
            <div class="banner-item">
                <div class="banner-item-metric">Limited Seats</div>
                <p>Register for FREE hands-on workshops by industry experts.</p>
                <div class="cta secondary"><a href="/workshops">Learn More</a></div>
            </div>
        </section-->
        <section id="features" class="landing">
            <h1>Features</h1>
            <div id="features-container">
                <div class="feature">
                    <div><img src="/images/illustrations/feature-venue.gif" alt="illustration of Sunriver Resort"/></div>
                    <h2><a href="/conference#hosted-at-sunriver-resort-oregon">Sunriver Resort</a></h2>
                    <p>Located just outside of Bend, this is one of the most beautiful resorts in the PacNW and is the perfect place to bring us all back together for an in-person event.</p>
                </div>
                <div class="feature">
                    <div><img src="/images/illustrations/feature-family.gif" alt="illustration of an icecream cone"/></div>
                    <h2><a href="/conference#bringing-the-family">Family Friendly</a></h2>
                    <p>In addition to the fun at the resort (pool, bikes, etc) we will be providing FREE child care so that you can bring the whole family without missing any of the fun.</p>
                </div>
                <div class="feature">
                    <div><img src="/images/illustrations/feature-talks.gif" alt="illustration of a microphone"/></div>
                    <h2><a href="/speakers">21 Awesome Speakers</a></h2>
                    <p>We are being joined by a wonderful line-up of speakers covering everything from the latest in the web and Node.js to building a more inclusive tech industry.</p>
                </div>
                <div class="feature">
                    <div><img src="/images/illustrations/feature-workshops.gif" alt="illustration of merit badge"/></div>
                    <h2><a href="/workshops">Hands-on Workshops</a></h2>
                    <p>Running parallel to the talks, there will be hands-on workshops to choose from if you care to roll-up your sleeves and do some coding.</p>
                </div>
                <div class="feature">
                    <div><img src="/images/illustrations/feature-allinclusive.gif" alt="illustration of a meal"/></div>
                    <h2><a href="/conference#all-inclusive">All Inclusive</a></h2>
                    <p>Your ticket includes a Welcome Reception, 3 meals a day for 2 days and 2 awesome parties!</p>
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
        <section id="speakers" class="landing">
            <h1>Speakers</h1>
            ${ speakersContainer }
        </section>
        <section id="organizers" class="landing">
            <h1>Organizers</h1>
            ${ organizersContainer }
        </section>
        <section id="directory" class="landing">
            <h1>Conference Directory</h1>
            ${ directoryContainer }
        </section>
    </div>
    `
    return content
}

let DirectoryContainer = function ({ directory }) {
    return /*html*/`
        <div id="attendee-list">
            ${ directory.map(t => /*html*/`
                <a target="_github" href="https://github.com/${ t.github }"><img src="${ t.avatar }" alt="avatar image for ${ t.fullName }" /></a>
                `).join("")}
        </div>`
}

module.exports = async function IndexView ({ speakers }) {
    let directory = await getDirectoryData()
    let speakersContainer = SpeakersContainer({ speakers })
    let organizersContainer = OrganizersContainer()
    let directoryContainer = DirectoryContainer({ directory })
    let content = Template({ speakersContainer, organizersContainer, directoryContainer })
    let rawHead = '<link rel="preload" href="/images/bend/hero-photo.jpg" as="image">'
    let html = Layout({ path: '/', title: 'Home', content, rawHead })
    return { html }
}
