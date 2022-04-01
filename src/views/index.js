let Layout = require('./layout')
let getDirectoryData = require('../shared/get-directory-data')
let SpeakersContainer = require('./components/speakers')
let OrganizersContainer = require('./components/organizers')

let randomIntFromInterval = function(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let randomAngle = function() {
    return randomIntFromInterval(5, 15) * (Math.random() > 0.5 ? 1 : -1)
}

let Template = function ({ speakersContainer, organizersContainer, directoryContainer }) {
    let content = /*html*/`
    <div id="landing">
        <section id="hero">
            <img src="/images/bend/hero-photo.jpg" alt="Beautiful Bend, OR"/>
            <div id="event-title"><img src="/images/event-logo.svg"/></div>
            <div id="classic-photos">
                <div id="classic-photo-1"><img src="/images/past/photo-2014.png" style="transform: rotate(${ randomAngle() }deg);"/></div>
                <div id="classic-photo-2"><img src="/images/past/photo-2015.png" style="transform: rotate(${ randomAngle() }deg);"/></div>
                <div id="classic-photo-3"><img src="/images/past/photo-2019.png" style="transform: rotate(${ randomAngle() }deg);"/></div>
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
        <!--section id="directory" class="landing">
            <h1>Conference Directory</h1>
            ${ directoryContainer }
            <div style="margin-top:32px"><i>Learn more about <a href="/directory">how we built this Conference Directory</a> and then <a href="/home/dashboard">get yourself added</a>!</i></div>
        </section-->
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
    let html = Layout({ path: "/", content, title: 'Home', scripts: ['/js/autoplay-hero.js'] })
    return { html }
}
