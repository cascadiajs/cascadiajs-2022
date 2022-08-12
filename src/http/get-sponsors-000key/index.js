let arc = require('@architect/functions')
let sponsors = require('@architect/shared/data/sponsors.json')
let SponsorView = require('@architect/views/sponsor')
let JobsView = require('@architect/views/jobs')
let NotFoundView = require('@architect/views/404')

async function Sponsor(req) {
  const { key } = req.params
  const { social } = req.queryStringParameters
  if (key === 'jobs') {
    let hiring = sponsors.filter(s => s.jobs !== undefined)
    return await JobsView({ sponsors: hiring, social })
  }
  else {
    const sponsor = sponsors.find(s => s.key === key)
    //console.log(sponsor)
    if (sponsor) {
      return await SponsorView({sponsor, social})
    }
  }
}

exports.handler = arc.http.async(Sponsor, NotFoundView)