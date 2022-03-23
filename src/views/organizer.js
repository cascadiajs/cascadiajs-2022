let md = require('marked')
let Layout = require('./layout')
let SocialLayout = require('./layout/social')

let Template = function(organizer) {
    const { key, name, location, role, pronouns, twitter, bio } = organizer

    return /*html*/`
    <div id="page">
        <div class="page-title">
            <div>
                <h1>Organizer</h1>
            </div>
        </div>
        <div class="page-body">
            <section class="person">
                <h2>${ name } - ${ role }</h2>
                <div class="person-info"> 
                    <div class="person-photo"><img src="/images/organizers/${ key }.jpg" alt="photo of ${ name }"/></div>
                    <div class="person-more">
                        ${ pronouns ? `<h3>Pronouns</h3><p>${ pronouns }</p>` : '' }
                        <h3>Location</h3>
                        <p>${ location }</p>
                        ${ twitter ? `<h3>Social</h3><p><i class="fab fa-twitter"></i> <a target="_blank" href="https://twitter.com/${ twitter }">@${ twitter }</a></p>` : '' }
                    </div>
                </div>
                <p>${ md(bio) }</p>
            </section>
        </div>
    </div>
`
}

module.exports = async function Organizer({organizer, social}) {
    let html
    if (social !== undefined) {
        const { key, name: caption, role: header, bio: excerpt } = organizer
        const image = `/images/organizers/${ key }.jpg`
        html = SocialLayout({ image, header, excerpt, caption })
    }
    else {
        let content = Template(organizer)
        let socialUrl = `/social?path=/organizers/${ organizer.key }`
        let title = `${ organizer.name } | ${ organizer.role }`
        html = Layout({ content, title, socialUrl })
    }

    return { html }
}
