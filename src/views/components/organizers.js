let organizers = require('../../shared/data/organizers.json')

module.exports = function OrganizerContainer () {
    return /*html*/`
    <div class="person-list">
        ${ organizers.map(o => /*html*/`
        <div class="person">
            <div class="person-photo"><a href="/organizers/${ o.key }"><img src="/images/organizers/${ o.key }.jpg" alt="photo of ${ o.name }" /></a></div>
            <div class="person-info">
                <div class="person-name"><a href="/organizers/${ o.key }">${ o.name }</a></div>
                <div class="person-misc">${ o.role }<br/>${ o.pronouns }<br/>${ o.location }</div>
            </div>
        </div>`).join("")}
    </div>`
}
