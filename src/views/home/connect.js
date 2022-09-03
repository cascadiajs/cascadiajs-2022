let Layout = require('../layout/home')

module.exports = async function({ ticket, connections }) {
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Connect 🤝</h1></div></div>
            <div class=page-body class=narrow>
            <h2>Make a Connection</h2>
            <iframe id="retool-app" height="525" scrolling="no" allow="camera" style="border:none" src="https://retoolin.tryretool.com/embedded/public/3997468d-a0cf-4d2f-b18e-055db698b133?auth_hash=${ encodeURIComponent(ticket.auth_hash) }"></iframe>
            <h2>Your Connections</h2>
            ${ connections.map((c) => /*html*/`
                <details>
                    <summary>${ c.to_data.full_name }</summary>
                    <ul>
                        <li>${ c.to_data.email_share }</li>
                        ${ c.to_data.linkedin ? `<li><a target="_blank" href="${ c.to_data.linkedin }">${ c.to_data.linkedin }</a></li>` : `` }
                        ${ c.to_data.twitter ? `<li><a target="_blank" href="https://twitter.com/${ c.to_data.twitter }">@${ c.to_data.twitter }</a></li>` : `` }
                        ${ c.to_data.github ? `<li><a target="_blank" href="https://github.com/${ c.to_data.github }">@${ c.to_data.github }</a></li>` : `` }
                        ${ c.to_data.bio ? `<li>${ c.to_data.bio }</li>` : `` }
                    </ul>
                </details>
            `).join('')}
            <div class="cta"><a target="_csv" href="/home/connect?csv=true">Download Connections CSV</a></div>
            </div>
            <script>
                window.addEventListener('message', (event) => {
                    if (event.data === 'reload') window.location.reload();
                });
            </script>
        </div>
    `
    let html = Layout({ content, view: 'connect' })
    return { html }
}
