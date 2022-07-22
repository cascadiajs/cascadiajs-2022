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

    // Check to see if there's a new agenda item happening so we reset the Emote and Q&A widgets
    function checkForNewAgendaItem() {
      if (state.agenda !== undefined) {
        // find our current place in the agenda
        let currentAgendaId;
        let now = Date.now();
        for (let i in state.agenda) {
          let item = state.agenda[i];
          let itemTime = new Date(item.when).getTime();
          // if this item is after the current time
          if (now > itemTime) {
            currentAgendaId = state.agenda[i].id;
          }
        }
        // the agenda is sorted by item.when asc, so if multiple items are after now(), the last / most recent will be set to the currentAgendaId

        if (currentAgendaId === undefined) {
          document
            .querySelector("q-and-a")
            .setAttribute("placeholder", true);
          console.log("Waiting for agenda to begin... ", state.agenda[0])
        }
        else if (state.currentAgendaId !== currentAgendaId) {
          // a new agenda item!
          let current = state.agenda.find(a => a.id === currentAgendaId);
          console.log("A new agenda item!", current);
          // reset the emote counter
          document
            .querySelector("emote-widget")
            .setAttribute("talk-id", current.what);
          // reset the Q&A widget
          document
            .querySelector("q-and-a")
            .setAttribute("correlation-id", current.what);
          // set Q&A to "placeholder" if the next agenda item isn't a talk
          document
            .querySelector("q-and-a")
            .setAttribute("placeholder", !current.talk);
          // reset index
          state.currentAgendaId = currentAgendaId;
        }
        else {
          // we are in the middle of an agenda item
        }
      }

      if (
        state.currentAgendaId === undefined ||
        state.currentAgendaId !== "rec65BeJbaMM8OMo3" // the last agenda item
      ) {
        // if the show hasn't started yet OR isn't over yet, keep checking for a new agenda item
        setTimeout(() => {
          checkForNewAgendaItem();
        }, 1000 * 20 /* re-run once every 20 seconds */);
      } else {
        console.log(
          "No more agenda items, the show must be over! Thanks for attending CascadiaJS :)"
        );
      }
    }

    // set initial state
    const state = {
      slackView: true,
      liveText: true,
      clapping: false,
      clappingContext: undefined,
      clappingBuffer: null,
      agenda: undefined,
      currentAgendaId: undefined,
    }

    // emote event types that we will use to trigger clapping sound effect
    const CLAPPABLE = ["celebrate", "heart", "plusone", "clap", "smile"];

    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyBHkheP0kQXmKORe7DG4X45hSHGXyp1qm4",
      authDomain: "cascadiajs-2021-schedule.firebaseapp.com",
      databaseURL: "https://cascadiajs-2021-schedule-default-rtdb.firebaseio.com",
      projectId: "cascadiajs-2021-schedule",
      storageBucket: "cascadiajs-2021-schedule.appspot.com",
      messagingSenderId: "580950881593",
      appId: "1:580950881593:web:3afd3f2fbd5ef6b71b64e8"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // load agenda from Firebase
    const db = getDatabase();
    const agendaRef = ref(db,  "agenda");
    onValue(agendaRef, (snapshot) => {
      state.agenda = snapshot.val()
      state.agenda.sort((a, b) => new Date(a.when) - new Date(b.when));
      console.log(state.agenda)
    })

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

    // wire-up chat view controls
    document.getElementById("slack-view-button").onclick = () => {
      state.slackView = !state.slackView;
      document
        .getElementById("live")
        .classList.replace(
          `slack-view-${!state.slackView}`,
          `slack-view-${state.slackView}`
        );
      document
        .getElementById("chat")
        .classList.replace(
          `slack-view-${!state.slackView}`,
          `slack-view-${state.slackView}`
        );
    };

    // wire-up closed caption controls
    document.getElementById("stream-text-button").onclick = () => {
      state.liveText = !state.liveText;
      document
        .getElementById("stream-text")
        .classList.replace(
          `stream-text-${!state.liveText}`,
          `stream-text-${state.liveText}`
        );
    };

    // wire-up audio controls
    document.getElementById("clapping-audio-button").onclick = () =>
      toggleAudio();

    // trigger clapping sound effect if applicable
    document.querySelector("emote-widget").onEmote((event) => {
      if (CLAPPABLE.includes(event.data) && state.clapping) {
        audioClap();
      }
    });


    checkForNewAgendaItem();
  },
  false
);
