let data = require('@begin/data')
let arc = require('@architect/functions')
let activities = require('@architect/shared/data/activities.json')

let layout = body=> `<!doctype>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel=stylesheet href=/styles/admin.css>
<body>${ body }</body>
</html>`

exports.handler = arc.http.async(unauthenticated, authenticated)

/** render the login form */
async function unauthenticated(req) {
  if (req.session.loggedIn) return
  else {
    let form = `
      <h1>Please Log-in</h1>
      <form action=/admin method=post>
        <input type=password name=password>
        <input type=submit value=Log-In>
      </form>`
    let html = layout(form)
    return { html }
  }
}

async function authenticated(req) {
  /*let speakerData = await data.get({ table: 'speakers', limit: 100 })
  if (req.query.export === 'speakers') {
    return { json: speakerData }
  }
  else {*/
    let linkData = await data.get( {table: 'links', limit: 100 })
    let newLink = link()
    let linksSection = `<h2>Private Links</h2>${ linkData.map(link).join('') + newLink }`
    //let newSpeaker = speaker()
    //let speakersSection = `<h2>Speakers</h2>${ newSpeaker + speakerData.map(speaker).join('') }`
    let ticketData = await data.get( {table: 'tickets', limit: 5000 })
    let newTicket = ticket()
    let ticketsSection = `<h2>Tickets</h2>${ newTicket + ticketData.map(ticket).join('') }`
    let rsvpData = await data.get({ table: 'rsvps', limit: 500 })
    let activitySection = `<h2>Activity Registrations</h2>${ activities.map((a) => { return activity(a, rsvpData, ticketData) }).join('') }`
    let html = layout(linksSection /*+ speakersSection*/ + ticketsSection + activitySection)
    return { html }
  //}
}

function ticket(t) {
  return `<details>
      <summary>${ t ? `${ t.key } ${ t.release_title } ${ t.full_name }` : 'new ticket' }</summary>
      <form action=/admin/tickets/${ t ? t.key : 'new' } method=post>
        <input type=${ t ? 'hidden' : 'text' } ${ t ? '' : 'placeholder=key' } name=key value="${ t ? t.key : '' }">
        <input type=text name=number placeholder="Number" value="${ t?.number || '' }">
        <input type=text name=release_title placeholder="Release Title" value="${ t?.release_title || '' }">
        <input type=text name=release_slug placeholder="Release Slug" value="${ t?.release_slug || '' }">
        <input type=text name=full_name placeholder="Full Name" value="${ t?.full_name || '' }">
        <input type=text name=email placeholder="Email" value="${ t?.email || '' }">
        <input type=text name=github placeholder="Github username" value="${ t?.github || '' }">
        <input type=text name=avatar placeholder="Github avatar URL" value="${ t?.avatar || '' }">
        <button>Save</button>
      </form>
      ${ t
        ? `
      <form action=/admin/tickets/${ t.key } method=post>
        <input type=hidden name=key value="${ t.key }">
        <input type=hidden name=__delete value="true">
        <button>Delete</button>
      </form>`
        : '' }
    </details>`
}

/*function speaker(person) {
  return `<details>
  <summary>${ person ? person.name : 'new speaker' }</summary>
  <form action=/speakers/${ person ? person.key : 'new' } method=post>
    <input type=${ person ? 'hidden' : 'text' } ${ person ? '' : 'placeholder=key' } name=key value="${ person ? person.key : '' }">
    <input type=text name=pixelated placeholder="pixelated hash value" value="${ person ? person.pixelated : ''}" required>
    <input type=text name=name placeholder="Name" value="${ person ? person.name : ''}" required>
    <input type=text name=location value="${ person ? person.location : '' }" placeholder="Location (eg. Los Angeles, CA)" required>
    <input type=text name=title value="${ person ? person.title : '' }" placeholder="Talk title" required>
    <input type=text name=reveal placeholder="2020-06-20T13:30:00-07:00" value="${ person ? person.reveal : '' }" required>
    <input type=text name=topics value="${ person && person.topics && person.topics.length > 0 ? person.topics.join(',') : '' }" placeholder="Topics (comma-delimited)" required>
    <input type=text name=pronouns value="${ person ? person.pronouns : '' }" placeholder="she/her" required>
    <input type=text name=twitter value="${ person?.twitter ? person.twitter : ''}" placeholder="Twitter (no @ symbol)">
    <input type=text name=url value="${ person?.url ? person.url : ''}" placeholder="URL">
    <input type=text name=company value="${ person ? person.company  : ''}" placeholder="Company" required>
    <textarea name=abstract value="${ person ? person.abstract : '' }" placeholder="VB.NET and C# go on a date with Java and JavaScript …" required>${ person ? person.abstract : '' }</textarea>
    <button>Save</button>
  </form>
  ${ person
    ? `<form action=/speakers/${ person.key } method=post><input type=hidden name=__delete value="true"><button>Delete</button></form>`
    : '' }
</details>`
}*/

function link(l) {
  return `<details>
      <summary>${ l ? l.label : 'New Link' }</summary>
      <form action=/admin/links/${ l ? l.key : 'new' } method=post>
        <input type=${ l ? 'hidden' : 'text' } name=key placeholder="key" value="${ l ? l.key : '' }">
        <input type=text name=label placeholder="Label" value="${ l ? l.label : '' }">
        <input type=text name=url placeholder="https://foo.com/bar" value="${ l ? l.url : '' }">
        <button>Save</button>
      </form>
    </details>`
}

function activity(a, rsvpData, ticketData) {
  let rsvps = rsvpData.filter((r) => r.activity === a.key)
  return `<h3>${ a.name } (${ rsvps.length })</h3><table>${ rsvps.map((r) => { return rsvp(r, ticketData) }).join('') }</table>`
}

function rsvp(r, ticketData) {
  let ticket = ticketData.find((t) => t.key === r.key) || { full_name: 'not found', email: 'not found'}
  return `
    <tr>
      <td>${ r.key }</td>
      <td>${ ticket.full_name }</td>
      <td>${ ticket.email }</td>
      <td>${ r.activity }</td>
      <td><form action=/admin/rsvps/${ r.key } method=post><input type=hidden name=__delete value="true"><button>Delete</button></form></td>
    </tr>`
}