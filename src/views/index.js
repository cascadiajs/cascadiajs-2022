let Layout = require('./layout')
let getDirectoryData = require('../shared/get-directory-data')
let SpeakersContainer = require('./components/speakers')
let OrganizersContainer = require('./components/organizers')

let Template = function ({ speakersContainer, organizersContainer, directoryContainer }) {
    let content = /*html*/`
    <div id="landing">
        <section id="hero">
            <div id="hero-video">
                <div id="hero-copy">Join us Summer 2022 at Sunriver Resort in Oregon for the 10th Anniversary of CascadiaJS!</div>
                <video autoplay loop muted><source src="https://www.sunriverresort.com/site/assets/files/1/srr_summer_60sec_v3-720.mp4" type="video/mp4"></video>
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
    let html = Layout({ content, title: 'Home' })
    return { html }
}
