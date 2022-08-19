let LiveLayout = require('../layout/live')
let sponsors = require('../../shared/data/sponsors.json')

module.exports = function Expo() {
    let hiring = sponsors.filter(s => s.jobs)
    let content = /*html*/`
    <div id="page">
    <div class="page-title">
        <div class="wide">
            <h1>Companies Hiring at CascadiaJS</h1>
        </div>
    </div>
    <div class="page-body wide">
        <p>Connect with our event sponsors during the breaks! Chat face-to-face on Gather or stick to text on our Discord.</p>
        <br/>
        <div style="margin-bottom: 48px">
            <span class="cta"><a target="_discord" href="https://discord.gg/cascadiajs">Join Discord</a></span>
            <span class="cta"><a target="_gather" href="https://app.gather.town/events/DLM6I5xJNNbT62oqPaqa">Join Gather</a></span>
        </div>
        <div class="job-listings">
        ${ hiring.sort(()=> Math.random() - 0.5).map(s => /*html*/`
            <div class="job-listing">
                <div><img src="/images/sponsors/${ s.logo }" alt=""/></div>
                <p>${ s.description }</p>
                <div><div class="cta secondary"><a target="_blank" href="${ s.jobs }">View Jobs</a></div></div>
            </div>
        `
        ).join("")}
        </div>
    </div>
</div>
    `
    let html = LiveLayout({ content, view: 'jobs' })
    return { html }
}


