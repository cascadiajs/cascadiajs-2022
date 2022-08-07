/* eslint-disable */

document.addEventListener(
  "DOMContentLoaded",

  async function main() {
    // HACK - for some reason, the animations for the emote widget do not work unless the widget has been "activated" by clicking on it
    document.querySelector('emote-widget').shadowRoot.querySelector('.activator').click()
    document.querySelector('emote-widget').shadowRoot.querySelector('.activator').click()
    window.clapping(true)
  },
  false
);
