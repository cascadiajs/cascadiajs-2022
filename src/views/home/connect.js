let Layout = require('../layout/home')

module.exports = async function({ ticket, connections, message }) {
    let { auth_hash, conn_hash } = ticket
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Connect 🤝</h1></div></div>
            <div class=page-body class=narrow>
            ${ message ? `<p><span class="highlight success">${ message }</span></p>` : ``}
            <h2>Make a Connection</h2>
            <iframe id="retool-app" height="525" scrolling="no" allow="camera" style="border:none" src="https://retoolin.tryretool.com/embedded/public/3997468d-a0cf-4d2f-b18e-055db698b133?auth_hash=${ encodeURIComponent(auth_hash) }"></iframe>
            <h2>Share Your Connection URL</h2>
            <p>This is a public URL that you can share with people who you'd like to connect with via the CascadiaJS 2022 app.</p>
            <input type="text" value="http://2022.cascadiajs.com/home/connect?add_connection=${ conn_hash }" size="62">
            <i id="copy-sharing-url-button" class="fa-regular fa-copy" style="margin:-25px"></i>
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

                const copySharingUrlButton = document.getElementById("copy-sharing-url-button");
                copySharingUrlButton.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await navigator.clipboard.writeText("https://2022.cascadiajs.com/home/connect?add_connection=${ conn_hash }")
                    alert("URL copied to your clipboard")
                })
            </script>
        </div>
    `
    let html = Layout({ content, view: 'connect' })
    return { html }
}
