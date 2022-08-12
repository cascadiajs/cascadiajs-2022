let { marked } = require('marked')
let Layout = require('./layout')
let SocialLayout = require('./layout/social')

let Template = function(sponsor) {
    const { name, logo, url, jobs, description, workshop, workshop_link, video_id } = sponsor

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
                ${ video_id
                    ? `<div style="position: relative; padding-top: 56.25%;"><iframe src="https://iframe.videodelivery.net/${ video_id }?autoplay=true&muted=true&poster=https%3A%2F%2Fcloudflarestream.com%2F${ video_id }%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>`
                    : '' }
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
