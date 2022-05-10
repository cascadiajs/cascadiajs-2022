let { marked } = require('marked')
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
                <p>${ marked.parse(description) }</p>
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
