let Layout = require('./layout')
let SocialLayout = require('./layout/social')

let Template = function(sponsors) {

    return /*html*/`
    <div id="page">
        <div class="page-title">
            <div>
                <h1>Companies Hiring at CascadiaJS</h1>
            </div>
        </div>
        <div class="page-body">
            <div class="job-listings">
            ${ sponsors.sort(()=> Math.random() - 0.5).map(s => /*html*/`
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
}

module.exports = async function Jobs({ sponsors, social }) {
    let html
    if (social !== undefined) {
        html = SocialLayout({ 
            header: 'Companies Hiring at CascadiaJS', 
            excerpt: 'Grow your career and connect with awesome companies!',
            image: '/images/past/cjs18-sponsor.jpg',
            caption: 'Amazon hiring at CascadiaJS 2018',
        })
    }
    else {
        let content = Template(sponsors)
        let socialUrl = '/social?path=/sponsors/jobs'
        let title = 'Companies Hiring at CascadiaJS'
        html = Layout({ path: '/jobs', content, title, socialUrl })
    }

    return { html }
}
