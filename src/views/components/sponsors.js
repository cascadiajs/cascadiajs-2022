let sponsors = require('../../shared/data/sponsors.json')

module.exports = function SponsorsContainer () {
    return /*html*/`
        <div class="sponsors-grid">
        ${ ['platinum', 'gold', 'silver', 'bronze', 'community'].map(tier => /*html*/`
            ${ sponsors.filter(s => s.tier === tier).length > 0 ? /*html*/`
                <div class="tier-wrap"><div class="tier-inner"><div class="tier-label">${ tier }</div></div></div>
                <div class="${ tier } tier">
                ${ sponsors.filter(s => s.tier === tier).map(s => /*html*/`
                    ${ ['platinum', 'gold', 'silver'].indexOf(tier) >= 0
                        ? /*html*/`<div><a title="${ s.name }" href="/sponsors/${ s.key }"><img src="/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>`  
                        : /*html*/`<div><a title="${ s.name }" target="_sponsor" href="${ s.url }"><img src="/images/sponsors/${ s.logo }" alt="${ s.name } logo"/></a></div>`
                    }
                `).join('') }
                </div>
            `: ''}        
        `).join('')}
        </div>`
}
