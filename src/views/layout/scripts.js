const { GOOGLE_SITE_ID, FONTAWESOME } = require("../../shared/config.json")

function script(source) {
  return `<script src=${source}></script>`
}

module.exports = function Scripts ({ scripts = [] }) {
  return /*html*/`
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=${ GOOGLE_SITE_ID }"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ GOOGLE_SITE_ID }');
      </script>
      <script src="https://platform.twitter.com/widgets.js"></script>
      <script type="text/javascript">
      _linkedin_partner_id = "3996660";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      </script><script type="text/javascript">
      (function(l) {
      if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
      window.lintrk.q=[]}
      var s = document.getElementsByTagName("script")[0];
      var b = document.createElement("script");
      b.type = "text/javascript";b.async = true;
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b, s);})(window.lintrk);
      </script>
      <noscript>
      <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=3996660&fmt=gif" />
      </noscript>
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
