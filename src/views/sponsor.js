let { marked } = require('marked')
let Layout = require('./layout')
let SocialLayout = require('./layout/social')

let Template = function(sponsor) {
    const { name, logo, url, jobs, description, workshop, workshop_link } = sponsor

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
                <p>${ marked.parse(description) }</p>
                <div class="cta"><a target="_blank" href="${ url }">Learn More</a></div>
                ${ jobs ? /*html*/`<h2>${ name } is Hiring!</h2>
                <div class="cta secondary"><a target="_blank" href="${ jobs }">Open Jobs</a></div>` : '' }
                ${ workshop ? /*html*/`<h2>${ name } is Running a Workshop at CascadiaJS!</h2>
                <p>${ workshop }</p>
                <div class="cta secondary"><a href="${ workshop_link }">RSVP</a></div>` : '' }
            </section>
        </div>
    </div>
`
}

module.exports = async function Sponsor({sponsor, social}) {
    let html
    if (social !== undefined) {
        const { logo, square, name: header, description, short, tier } = sponsor
        const excerpt = short || description
        const image = `/images/sponsors/${ square || logo }`
        const caption = `${ tier.charAt(0).toUpperCase() + tier.slice(1) } Sponsor`
        html = SocialLayout({ image, header, excerpt, caption })
    }
    else {
        let content = Template(sponsor)
        let socialUrl = `/social?path=/sponsors/${ sponsor.key }`
        let title = `Sponsor | ${ sponsor.name }`
        html = Layout({ path: `/sponsors/${ sponsor.key }`, content, title, socialUrl })
    }

    return { html }
}
