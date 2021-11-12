const { GOOGLE_SITE_ID, FONTAWESOME } = require("../../shared/config.json")

function script(source) {
  return `<script src=${source}></script>`
}

module.exports = function Scripts ({ scripts = [] }) {
  return /*html*/`
      <!-- Global site tag (gtag.js) - Google Analytics -->
<!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=${ GOOGLE_SITE_ID }"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ GOOGLE_SITE_ID }');
      </script>
      <script src="https://kit.fontawesome.com/${ FONTAWESOME }.js" crossorigin="anonymous" async></script>
      <script>
      (function setFavicon() {
        const lightSchemeIcon = document.querySelector('link#light-scheme-icon');
        const darkSchemeIcon = document.querySelector('link#dark-scheme-icon');
        const setLight = () => {
          document.head.append(lightSchemeIcon);
          darkSchemeIcon.remove();
        }
        const setDark = () => {
          lightSchemeIcon.remove();
          document.head.append(darkSchemeIcon);
        }
        const onUpdate = () => {
          if (matcher.matches) setDark();
          else setLight();
        }
        const matcher = window.matchMedia('(prefers-color-scheme:dark)');
        matcher.addListener(onUpdate);
        onUpdate();
      })();
      </script>
      ${ scripts.map(s => script(s)) }
`
}
