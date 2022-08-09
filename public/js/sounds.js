/* eslint-disable */

document.addEventListener(
  "DOMContentLoaded",

  async function main() {
  
    // play clapping sound effect
    function audioClap() {
      if (state.clappingContext) {
        const source = state.clappingContext.createBufferSource();
        source.buffer = state.clappingBuffer;
        const gainNode = state.clappingContext.createGain();
        source.connect(gainNode);
        gainNode.connect(state.clappingContext.destination);
        gainNode.gain.value = 0.1; // lower volume to 10%
        source.start();
      }
    }

    // toggle clapping on/off
    function toggleAudio() {
      state.clapping = !state.clapping;
      if (state.clappingContext) {
        if (state.clapping) {
          state.clappingContext.resume();
        } else {
          state.clappingContext.suspend();
        }
      }
    }

    // set initial state for clapping
    const state = {
      clapping: false,
      clappingContext: undefined,
      clappingBuffer: null
    }

    // expose clapping boolean to global scope for web-inputs.js
    window.clapping = function(bool) {
      state.clapping = bool
    }

    // emote event types that we will use to trigger clapping sound effect
    const CLAPPABLE = ["clap"];

    // check for Web Audio API
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      state.clappingContext = new AudioContext();
    } catch (e) {
      console.log("Web Audio API is not supported in this browser");
    }

    // load clapping audio file if we have access to the Web Audio API
    if (state.clappingContext) {
      const URL = "/sounds/applause-8.mp3";
      window
        .fetch(URL)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) =>
          state.clappingContext.decodeAudioData(arrayBuffer)
        )
        .then((audioBuffer) => {
          state.clappingBuffer = audioBuffer;
        });
    }

    // wire-up audio controls
    if (document.getElementById("clapping-audio-button")) {
      document.getElementById("clapping-audio-button").onclick = () =>
        toggleAudio();
    }

    // trigger clapping sound effect if applicable
    document.querySelector("emote-widget").onEmote((event) => {
      if (CLAPPABLE.includes(event.data) && state.clapping) {
        audioClap();
      }
    });
  },
  false
);
