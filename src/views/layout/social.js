module.exports = function SocialLayout ({ header, image = '/images/sunriver/canoes.jpg', excerpt = '', caption = 'Canoeing on the Deschutes River' }) {
  return /*html*/`
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <link rel="stylesheet" href="https://use.typekit.net/sbt6vre.css">
    <link rel="stylesheet" href="/styles/normalize.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div style="background-image: url('/images/social-sharing-card.png'); height: 628px; width: 1200px;">
      <img src="${ image }" height="268" width="268" style="position:absolute;top:200px;left:160px;transform: rotate(-15deg);object-fit: cover;"/>
      <div style="width:268px;font-family:alkaline;font-size:25px;line-height:1.125em;font-weight:400;color:#112378;position:absolute;top:470px;left:205px;transform: rotate(-15deg);">
        ${ caption }
      </div>
      <div style="position:absolute;top:24px;left:600px;width:576px">
        <div style="font-family:alkaline-caps,sans-serif;color:#112378;font-size:80px;line-height:80px;font-weight:700;margin-bottom:24px;">
          ${ header }
        </div>
        <div style="font-family:canada-type-gibson,sans-serif;color:#112378;font-size:50px;line-height:1.125em">
          ${ excerpt }
        </div>
      </div>
    </div>
  </body>
</html>
`
}
