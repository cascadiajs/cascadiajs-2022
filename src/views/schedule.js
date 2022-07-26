let Layout = require('./layout')
let ThinLayout = require('./layout/thin')
let { ConfSchedule } = require('./components/schedule')

function template({ confSchedule }) {
    return /*html*/`
        <div id="page">
            <div class="page-title">
                <div class="wide"><h1>Schedule</h1></div>
            </div>
            <div class="page-body wide">
                <div class="toc">
                    <h2>On This Page</h2>
                    <ul>
                        <li><a href="#day-zero">Aug 30 - Welcome Reception</a></li>
                        <li><a href="#day-one">Aug 31 - Day One</a></li>
                        <li><a href="#day-two">Sep 1 - Day Two</a></li>
                        <li><a href="#day-training">Sep 2 - Training Workshops</a></li>
                        <li><a href="#map-of-sunriver-resort">Map of Sunriver Resort</a></li>
                    </ul>
                </div>
                <!--p><i class="fas fa-calendar-alt"></i> <a href="https://airtable.com/shrFhMryCHcGdGLdW/iCal?timeZone=America%2FLos_Angeles&userLocale=en">Subscribe to the Live Stream Calendar</a></p-->
                ${ confSchedule }
                <h2 id="map-of-sunriver-resort">Map of Sunriver Resort</h2>
                <img src="/images/sunriver/sunriver-map.png" alt="map of Sunriver Resort"/>
            </div>
        </div>
    `
}

module.exports = async function Index({ speakers, thin }) {
    let confSchedule = await ConfSchedule({ speakers })
    let content = template({ confSchedule })
    let html = (thin !== undefined ? ThinLayout({ content }) : Layout({ content }))
    return { html }
}