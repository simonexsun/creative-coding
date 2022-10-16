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
let messageList;

function setup() {
  let cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  cnv.position(windowWidth * 0.1, windowHeight * 0.2);

  messageList = [
    new Message(
      "simone",
      "Lorem ipsum is placeholder text commonly publishing industries for previewing layouts and visual mockups.."
    ),
    new Message(
      "Boparai",
      "is nostliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu."
    ),
    new Message(
      "NATO",
      "“Nor is theor desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil."
    ),
    new Message(
      "McClintock",
      "“What I find remarkable is that this text has been the industry's standard dummy text ever since some printer in the 1500s took a galley of type and scrambled it to make a type specimen book; it has survived not only four centuries of letter-by-letter resetting but even the leap into electronic typesetti."
    ),
    new Message("simone", "ronic that when the t."),
    new Message(
      "Biblical",
      "re anyone who loves or pursues  used in the graphic, print, and."
    ),
  ];
}

function draw() {
  background("black");

  messageList.forEach((message) => {
    message.fade();
    message.display();
  });

  fill(255, 0, 0);
  text(`DEBUG: ${messageList.length} items in list`, 0, 0, width);
}

class Message {
  constructor(author, text) {
    this.text = text;
    this.author = author;

    this.opacity = 99;
    this.y = random(height);
  }

  formattedText() {
    return `${this.author}: ${this.text}`;
  }

  display() {
    textSize(15);
    fill(255, 251, 171, this.opacity); // bright yellow
    text(this.formattedText(), 0, this.y, width);
  }

  fade() {
    if (this.opacity > 0) {
      this.opacity -= 0.5;
    }
  }
}
