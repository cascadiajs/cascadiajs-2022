let arc = require('@architect/functions')
let organizers = require('@architect/shared/data/organizers.json')
let OrganizerView = require('@architect/views/organizer')
let NotFoundView = require('@architect/views/404')

async function Organizer(req) {
  const { key } = req.params
  const { social } = req.queryStringParameters
  const organizer = organizers.find(s => s.key === key)
  if (organizer) {
    return await OrganizerView({organizer, social})
  }
}

exports.handler = arc.http.async(Organizer, NotFoundView)