module.exports = async function Social({ ticket }) {
    let { number, full_name, release_title } = ticket
    let printNumber = number.toString().padStart(4, "0")
    let html = /*html*/ `
    <!doctype html>
    <html lang=en>
      <head>
        <meta charset=utf-8>
        <link rel="stylesheet" href="https://use.typekit.net/sbt6vre.css">
        <link rel="stylesheet" href="/styles/normalize.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preload" href="/images/virtual-ticket.png" as="image">
        <style>
            #ticket-name {
                width:670px;
                font-family:alkaline;
                font-size:85px;
                line-height:0.9em;
                font-weight:400;
                color:#112378;
                position:absolute;
                top:210px;
                left:180px;
            }
            #ticket-type {
                font-family:alkaline-caps;
                font-size:54px;
                font-weight:500;
                color:#112378;
            }
            #ticket-number {
                font-family:alkaline-caps;
                font-size:3em;
                line-height:1.125em;
                font-weight:500;
                color:#112378;
                position:absolute;
                top:130px;
                right:370px;
                transform: rotate(90deg);
            }
        </style>
      </head>
      <body>
        <div style="background-image: url('/images/virtual-ticket-transparent.png'); height: 628px; width: 1200px;">
            <div id="ticket-name">
                ${ full_name }
                <br/>
                <span id="ticket-type">${ release_title }</span>
            </div>
            <div id="ticket-number">
                #${ printNumber }
            </div>
        </div>
      </body>
    </html>
    `
    return { html }
}
