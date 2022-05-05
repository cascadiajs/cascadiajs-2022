module.exports = function SocialLayout ({ header, image = '/images/sunriver/canoes.jpg', excerpt = '', caption = 'Canoeing on the Deschutes River' }) {
  return /*html*/`
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <link rel="stylesheet" href="https://use.typekit.net/sbt6vre.css">
    <link rel="stylesheet" href="/styles/normalize.css">
    <link rel="stylesheet" href="/styles/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preload" href="/images/social-sharing-card.png" as="image">
  </head>
  <body>
    <div style="background-image: url('/images/social-sharing-card.png'); height: 628px; width: 1200px;">
      <img id="social-image" src="${ image }" />
      <div style="width:268px;font-family:alkaline;font-size:25px;line-height:1.125em;font-weight:400;color:#112378;position:absolute;top:470px;left:205px;transform: rotate(-15deg);">
        ${ caption }
      </div>
      <div id="social-info">
        <div id="social-header">
          ${ header }
        </div>
        <div id="social-excerpt">
          ${ excerpt }
        </div>
      </div>
    </div>
  </body>
</html>
`
}
