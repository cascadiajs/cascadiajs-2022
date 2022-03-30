let md = require('marked')
let Layout = require('./layout')
let SocialLayout = require('./layout/social')

let Template = function(sponsor) {
    const { name, logo, url, jobs, description } = sponsor

    return /*html*/`
    <div id="page">
        <div class="page-title">
            <div>
                <h1>Sponsor - ${ name }</h1>
            </div>
        </div>
        <div class="page-body">
            <section class="sponsor">
                <p><img src="/images/sponsors/${ logo }" alt="logo of ${ name }"/></p>
                <p>${ md(description) }</p>
                <p><a target="_blank" href="${ url }">Learn More</a></p>
                ${ jobs ? /*html*/`<h2>${ name } is Hiring!</h2>
                <p><a target="_blank" href="${ jobs }">Open Jobs</a></p>` : '' }
            </section>
        </div>
    </div>
`
}

module.exports = async function Sponsor({sponsor, social}) {
    let html
    if (social !== undefined) {
        const { logo, name: header, role: excerpt } = sponsor
        const image = `/images/sponsors/${ logo }`
        html = SocialLayout({ image, header, excerpt })
    }
    else {
        let content = Template(sponsor)
        let socialUrl = `/social?path=/sponsors/${ sponsor.key }`
        let title = `Sponsor | ${ sponsor.name }`
        html = Layout({ content, title, socialUrl })
    }

    return { html }
}
