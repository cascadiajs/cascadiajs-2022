let data = require('@begin/data')
let arc = require('@architect/functions')

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

/** render the speaker list/form */
async function authenticated(req) {
  let speakerData = await data.get({ table: 'speakers', limit: 20 })
  if (req.query.export === 'speakers') {
    return { json: speakerData }
  }
  else {
    let linkData = await data.get( {table: 'links', limit: 100 })
    let newLink = link()
    let linksSection = `<h2>Private Links</h2>${ linkData.map(link).join('') + newLink }`
    let newSpeaker = speaker()
    let speakersSection = `<h2>Speakers</h2>${ newSpeaker + speakerData.map(speaker).join('') }`
    let ticketData = await data.get( {table: 'tickets', limit: 1000 })
    let ticketsSection = `<h2>Tickets</h2>${ ticketData.map(ticket).join('') }`
    let codeData = await data.get( {table: 'codes', limit: 1000 })
    let codesSection = `<h2>Redemption Codes</h2>${ codeData.map(code).join('') }`
    let html = layout(linksSection + speakersSection + ticketsSection + codesSection)
    return { html }
  }
}

function ticket(t) {
  return `<details>
      <summary>${ t.key } ${ t.ticket } ${ t.fullName } ${ t.conference === 'Y' ? '[Conf]' : '' } ${ t.hoodie === 'Y' ? '[Hoodie]' : '' }</summary>
      <form action=/ticket method=post>
        <input type=hidden name=key value="${ t.key }">
        <input type=text name=number placeholder="Number" value="${ t.number || '' }">
        <input type=text name=ticket placeholder="Ticket Type" value="${ t.ticket || '' }">
        <input type=text name=fullName placeholder="Full Name" value="${ t.fullName || '' }">
        <input type=text name=conference placeholder="Conference (Y/N)" value="${ t.conference || '' }">
        <input type=text name=hoodie placeholder="Hoodie (Y/N)" value="${ t.hoodie || '' }">
        <input type=text name=late_hoodie placeholder="Late Hoodie (Y/N)" value="${ t.late_hoodie || '' }">
        <input type=text name=code placeholder="Redemption Code" value="${ t.code || '' }">
        <input type=text name=github placeholder="Github username" value="${ t.github || '' }">
        <input type=text name=avatar placeholder="Github avatar URL" value="${ t.avatar || '' }">
        <button>Save</button>
      </form>
      <form action=/ticket method=post>
        <input type=hidden name=key value="${ t.key }">
        <input type=hidden name=__delete value="true">
        <button>Delete</button>
      </form>
    </details>`
}

function code(c) {
  return `<details>
      <summary>${ c.key } ${ c.ticketRef }</summary>
      <form action=/code method=post>
        <input type=hidden name=key value="${ c.key }">
        <input type=text name=ticketRef placeholder="Ticket Reference" value="${ c.ticketRef || '' }">
        <button>Save</button>
      </form>
    </details>`
}

function speaker(person) {
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
  <form action=/delete method=post>
  <input type=hidden name=key value="${ person ? person.key : '' }">
  <button>Delete</button>
  </form>
</details>`
}

function link(l) {
  return `<details>
      <summary>${ l ? l.label : 'New Link' }</summary>
      <form action=/links/${ l ? l.key : 'new' } method=post>
        <input type=${ l ? 'hidden' : 'text' } name=key placeholder="key" value="${ l ? l.key : '' }">
        <input type=text name=label placeholder="Label" value="${ l ? l.label : '' }">
        <input type=text name=url placeholder="https://foo.com/bar" value="${ l ? l.url : '' }">
        <button>Save</button>
      </form>
    </details>`
}