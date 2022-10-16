// this app uses emojiTracker STREAM API.
// Unlike the REST API, it constantly receives events as long as the connection is open
// So instead of doing fetch(), I'm using EventSource.onmessage
// for more about SSE (server-sent events), visit https://developer.mozilla.org/en-US/docs/Web/API/EventSource

// Emojitracker Streaming API: https://github.com/emojitracker/emojitrack-streamer-spec/blob/master/README.md

// log all tweets contsins the emoji
// emoji by codepoint https://emojipedia.org/emoji/
const EPSendpoint = "https://stream.emojitracker.com/subscribe/eps";
const detailEndpoint = "https://stream.emojitracker.com/subscribe/1F62D";
// const EPSevtSource = new EventSource(EPSendpoint);
// const detailEvtSource = new EventSource(detailEndpoint);
// let messageCounter = 0;

// get DOM
// const eventList = document.querySelector("ul");

// EPSendpoint.onmessage = (e) => {
//   // parse json
//   let response = JSON.parse(e.data);
//   // do something
//   for (const key in response) {
//     if (Object.hasOwnProperty.call(response, "1F62D")) {
//       messageCounter++;
//     }
//   }
// };

// evtSource.addEventListener("message", (e) => {
//   // const newElement = document.createElement("li");
//   // newElement.textContent = `message: ${e.data}`;
//   // eventList.appendChild(newElement);
//   // const update = JSON.parse(e.data);
//   // console.log(`${update.screen_name} tweeted ${update.text}`);
//   console.log(`message: ${e.data}`);
// });

function setup() {
  let cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  cnv.position(windowWidth * 0.1, windowHeight * 0.2);
  background("black");
}
function draw() {}
