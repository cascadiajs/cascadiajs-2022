const { TYPEKIT } = require("../../shared/config.json")
const social = require("./social")

function script(source) {
  return `<script src=${source} type=module crossorigin></script>`
}

function getBaseUrl() {
  let url
  if (process.env.NODE_ENV === 'testing') {
      url = 'http://localhost:3333'
  }
  else  {
      url = `https://${ process.env.NODE_ENV === 'staging' ? 'staging.' : '' }2022.cascadiajs.com`
  }
  return url
}

module.exports = function Head ({path, title, socialUrl, excerpt = null, scripts = [], rawHead = ''}) {
  // expand title
  title = `CascadiaJS 2022${ title ? ' - ' + title : '' }`

  // set a default social sharing image
  if (socialUrl === undefined || socialUrl === "") {
    socialUrl = getBaseUrl() + "/social?path=/conference"
  }

  // convert relative a socialURL to absolute, if necessary
  if (socialUrl.startsWith("/")) {
    socialUrl = getBaseUrl() + socialUrl
  }

  let url = getBaseUrl() + path

  return /*html*/`
  <head>
    <meta charset=utf-8>
    <title>${ title }</title>
    <link rel="stylesheet" href="https://use.typekit.net/${ TYPEKIT }.css">
    <link rel="stylesheet" href="/styles/normalize.css">
    <link rel="stylesheet" href="/styles/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${ excerpt ? `<meta property="og:description" content="${ excerpt }" />` : ``}
    <meta name="image" property="og:image" content="${ socialUrl }" />
    <meta name="url" property="og:url" content="${ url }" />
    <meta name="type" property="og:type" content="website" />
    <meta name="author" content="Carter Rabasa">
    <meta property="og:title" content="${ title }" />
    <meta name="twitter:image" content="${ socialUrl }">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@cascadiajs">
    <meta name="twitter:title" content="${ title }">
    <link id="light-scheme-icon" rel="icon" href="/images/logo-blue.svg">
    <link id="dark-scheme-icon" rel="icon" href="/images/logo-green.svg">
    <script>
      !function(){var t=window.firstparty=window.firstparty||[];if(!t.initialize){if(t.invoked)return void(window.console&&console.error&&console.error("Firstparty snippet included twice."));t.invoked=!0,t.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"],t.factory=function(r){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(r),t.push(e),t}};for(var r=0;r<t.methods.length;r++){var e=t.methods[r];t[e]=t.factory(e)}t.load=function(r,e,i){t._writeKey=r,t._host=e,t._firstpartyOptions=i;var a="/js/firstparty.min.js";void 0!==i&&void 0!==i.libraryPath&&(a=i.libraryPath);var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://"+e+a;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(o,n)},t.SNIPPET_VERSION="0.1.0"}}();
      firstparty.load("zOVuuTNvEYFHM3sP", "fp.cascadiajs.com");
      firstparty.page();
    </script>
    <!-- Twitter universal website tag code -->
    <script>
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
    },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
    // Insert Twitter Pixel ID and Standard Event data below
    twq('init','o054c');
    twq('track','PageView');
    </script>
    <!-- End Twitter universal website tag code -->
    ${ scripts.map(s => script(s)) }
    ${ rawHead }
  </head>
`
}
