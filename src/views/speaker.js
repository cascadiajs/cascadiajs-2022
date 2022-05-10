
let { marked } = require('marked')
let Layout = require('./layout')
let SocialLayout = require('./layout/social')
let assetPath = 'https://create-4jr.begin.app/_static/2022'

let Template = function(speaker) {
    const { key, name, location, company, url, twitter, title, topics, pronouns, abstract, ytId } = speaker

    return /*html*/`
    <div id="page">
        <div class="page-title">
            <div>
                <h1>${ name }</h1>
            </div>
        </div>
        <div class="page-body">
            <section class="person">
                <h2>${ title }</h2>
                <div class="topics">${ topics.map(t => `<div class=js-topic>${ t }</div>`).join('') }</div>
                <div class="abstract">${ marked.parse(abstract) }</div>
                <!--div class="illustration">
                    <img src="https://static.cascadiajs.com/2021/graphic-recordings/${ key }.jpg" alt="talk illustration"/><br/>
                    <p><small><i>Illustrations made possible by our friends at <a href="https://trynewrelic.com/cascadiajs">NewRelic</a> ❤️</i></small></p>
                </div-->
                <!--div class="video">
                ${ ytId
                ?   /*html*/`<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${ ytId }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
                :   /*html*/`<p>Video Recording Coming Soon!</p>`}
                </div-->
                <h2>About ${ name }</h2>
                <div class="person-info"> 
                    <div class="person-photo"><img src="${ assetPath }/${ key }.jpg" alt="photo of ${ name }"/></div>
                    <div class="person-more">
                        ${ pronouns ? `<h3>Pronouns</h3><p>${ pronouns }</p>` : '' }
                        <h3>Location</h3>
                        <p>${ location }</p>
                        <h3>Company</h3>
                        <p>${ company }</p>
                        <h3>Links</h3>
                        <div class="person-links">
                        ${ twitter ? `<div><i class="fab fa-twitter"></i> <a target="_blank" href="https://twitter.com/${ twitter }">@${ twitter }</a></div>` : '' }
                        ${ url ? `<div><i class="fa fa-globe"></i> <a href="${ url }">${ url.split("://")[1] }</a></div>` : '' }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
`
}

module.exports = async function Speaker({speaker, social}) {
    let html
    if (social !== undefined) {
        const { key, name: caption, title: header  } = speaker
        const image = `${ assetPath }/${ key }.jpg`
        html = SocialLayout({ image, header, caption })
    }
    else {
        let content = Template(speaker)
        let socialUrl = `/social?path=/speakers/${ speaker.key }`
        //let socialUrl = `https://static.cascadiajs.com/2021/graphic-recordings/${ speaker.key }.jpg`
        let title = `${ speaker.name } | ${ speaker.title }`
        html = Layout({ path: `/speakers/${ speaker.key }`, content, title, socialUrl })
    }

    return { html }
}
