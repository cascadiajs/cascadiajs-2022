/* eslint-disable */

const agenda = [
  {
    "id": "pre-conference",
    "talk": false,
    "what": "The Show Starts Soon...",
    "when": "2022-08-06T00:37:00.000Z"
  },
  {
    "id": "day-one-open",
    "talk": false,
    "what": "Day One Open",
    "when": "2022-08-31T16:00:00.000Z"
  },
  {
    "id": "chris-coyier",
    "talk": true,
    "what": "Speaker Chris Coyier",
    "when": "2022-08-31T16:30:00.000Z"
  },
  {
    "id": "isabela-moreira",
    "talk": true,
    "what": "Speaker Isabela Moreira",
    "when": "2022-08-31T17:00:00.000Z"
  },
  {
    "id": "day-one-morning-break",
    "talk": false,
    "what": "Morning Break",
    "when": "2022-08-31T17:30:00.000Z"
  },
  {
    "id": "joyce-park",
    "talk": true,
    "what": "Speaker Joyce Park",
    "when": "2022-08-31T18:00:00.000Z"
  },
  {
    "id": "tejas-kumar",
    "talk": true,
    "what": "Speaker Tejas Kumar",
    "when": "2022-08-03T18:30:00.000Z"
  },
  {
    "id": "rachel-white",
    "talk": true,
    "what": "Speaker Rachel White",
    "when": "2022-08-31T19:00:00.000Z"
  },
  {
    "id": "day-one-lunch-break",
    "talk": false,
    "what": "Lunch break",
    "when": "2022-08-31T19:19:30.000Z"
  },
  {
    "id": "trivikram-kamat",
    "talk": true,
    "what": "Speaker Trivikram Kamat",
    "when": "2022-08-31T20:30:00.000Z"
  },
  {
    "id": "eddie-zaneski",
    "talk": true,
    "what": "Speaker Eddie Zaneski",
    "when": "2022-08-31T21:21:00.000Z"
  },
  {
    "id": "joyce-lin",
    "talk": true,
    "what": "Speaker Joyce Lin",
    "when": "2022-08-31T21:30:00.000Z"
  },
  {
    "id": "day-one-close",
    "talk": false,
    "what": "Closing Day One",
    "when": "2022-08-31T22:00:00.000Z"
  },
  {
    "id": "day-two-open",
    "talk": false,
    "what": "Day Two Open",
    "when": "2022-09-01T16:00:00.000Z"
  },
  {
    "id": "vladimir-de-turckheim",
    "talk": true,
    "what": "Speaker Vladimir de Turckheim",
    "when": "2022-09-01T16:30:00.000Z"
  },
  {
    "id": "ian-sutherland",
    "talk": true,
    "what": "Speaker Ian Sutherland",
    "when": "2022-09-01T17:00:00.000Z"
  },
  {
    "id": "day-two-morning-break",
    "talk": false,
    "what": "Morning Break",
    "when": "2022-09-01T17:30:00.000Z"
  },
  {
    "id": "aaroh-mankad",
    "talk": true,
    "what": "Speaker Aaroh Mankad",
    "when": "2022-09-01T18:00:00.000Z"
  },
  {
    "id": "brittany-joiner",
    "talk": true,
    "what": "Speaker Brittany Joiner",
    "when": "2022-09-01T18:30:00.000Z"
  },
  {
    "id": "daphne-tiger",
    "talk": true,
    "what": "Speakers Daphne & Tiger",
    "when": "2022-09-01T19:00:00.000Z"
  },
  {
    "id": "day-two-lunch-break",
    "talk": false,
    "what": "Lunch break",
    "when": "2022-09-01T19:30:00.000Z"
  },
  {
    "id": "saimon-sharif",
    "talk": true,
    "what": "Speaker Saimon Sharif",
    "when": "2022-09-01T20:30:00.000Z"
  },
  {
    "id": "dwane-hemmings",
    "talk": true,
    "what": "Speaker Dwane Hemmings",
    "when": "2022-09-01T21:00:00.000Z"
  },
  {
    "id": "rebecca-peltz",
    "talk": true,
    "what": "Speaker Rebecca Peltz",
    "when": "2022-09-01T21:30:00.000Z"
  },
  {
    "id": "day-two-afternoon-break",
    "talk": false,
    "what": "Afternoon Break",
    "when": "2022-09-01T22:00:00.000Z"
  },
  {
    "id": "mikeal-rogers",
    "talk": true,
    "what": "Speaker Mikeal Rogers",
    "when": "2022-09-01T22:30:00.000Z"
  },
  {
    "id": "brooklyn-zelenka",
    "talk": true,
    "what": "Speaker Brooklyn Zelenka",
    "when": "2022-09-01T23:00:00.000Z"
  },
  {
    "id": "day-two-late-afternoon-break",
    "talk": false,
    "what": "Day Two Late Afternoon Break",
    "when": "2022-09-01T23:30:00.000Z"
  },
  {
    "id": "shawn-wang",
    "talk": true,
    "what": "Speaker Shawn (swyx) Wang",
    "when": "2022-09-02T00:00:00.000Z"
  },
  {
    "id": "brian-leroux",
    "talk": true,
    "what": "Speaker Brian Leroux",
    "when": "2022-09-02T00:30:00.000Z"
  },
  {
    "id": "day-two-close",
    "talk": false,
    "what": "Conference Close",
    "when": "2022-09-02T01:00:00.000Z"
  }
]

document.addEventListener(
  "DOMContentLoaded",

  async function main() {
  
    // Check to see if there's a new agenda item happening so we can reset UIs
    function checkForNewAgendaItem() {
      console.log('Checking for new agenda item...')
      if (state.agenda !== undefined) {
        // find our current place in the agenda
        let currentAgendaIndex;
        let now = Date.now();
        for (let i in state.agenda) {
          let item = state.agenda[i];
          let itemTime = new Date(item.when).getTime();
          // if this item is after the current time
          if (now > itemTime) {
            currentAgendaIndex = parseInt(i)
          }
        }
        // the agenda is sorted by item.when asc, so if multiple items are after now(), the last / most recent will be set to the currentAgendaIndex

        if (currentAgendaIndex === undefined) {
          console.log("Waiting for agenda to begin... ", state.agenda[0])
        }
        else if (state.currentAgendaIndex !== currentAgendaIndex) {
          // a new agenda item!
          let current = state.agenda[currentAgendaIndex];
          console.log("A new agenda item!", current);
          let nextAgendaIndex = currentAgendaIndex + 1
          let next = nextAgendaIndex < state.agenda.length ? state.agenda[nextAgendaIndex] : undefined
          // reset the emote counter
          document
            .querySelector("emote-widget")
            .setAttribute("talk-id", current.id);
          // reset current/next UI
          document
            .getElementById("current-agenda")
            .innerHTML = current.what
          document
            .getElementById("next-agenda")
            .innerHTML = next ? next.what : ''      
          // reset index
          state.currentAgendaIndex = currentAgendaIndex;
        }
        else {
          // we are in the middle of an agenda item
        }
      }

      if (
        state.currentAgendaIndex === undefined ||
        state.currentAgendaIndex !== "????" // the last agenda item
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
      agenda: undefined,
      currentAgendaIndex: undefined,
    }

    // load agenda
    state.agenda = agenda // defined statically in this file, but maybe move to DB?
    state.agenda.sort((a, b) => new Date(a.when) - new Date(b.when));
    console.log(state.agenda)

    checkForNewAgendaItem();
  },
  false
);
