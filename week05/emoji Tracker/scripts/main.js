// this app uses emojiTracker STREAM API.
// Unlike the REST API, it constantly receives events as long as the connection is open
// So instead of doing fetch(), I'm using EventSource.onmessage
// for more about SSE (server-sent events), visit https://developer.mozilla.org/en-US/docs/Web/API/EventSource

// Emojitracker Streaming API: https://github.com/emojitracker/emojitrack-streamer-spec/blob/master/README.md

// log all tweets contsins the emoji
// (emoji by codepoint https://emojipedia.org/emoji/)
const detailEndpoint =
  "https://stream.emojitracker.com/subscribe/details/1F494";
// const EPSevtSource = new EventSource(EPSendpoint);

let messageList = [];

function setup() {
  let cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  cnv.position(windowWidth * 0.1, windowHeight * 0.2);

  // connect to STREAM API
  const detailEvtSource = new EventSource(detailEndpoint);

  // receive data, creat Message object, and push to the end of the messageList
  detailEvtSource.addEventListener("stream.tweet_updates.1F494", (e) => {
    const response = JSON.parse(e.data);
    const msg = new Message(response.screen_name, response.text);
    messageList.push(msg);
  });
}

function draw() {
  background("black");

  // remove objects that aren't visible from the messageList
  while (messageList.length > 0 && messageList[0].opacity <= 0) {
    messageList.shift();
  }

  // display messages in a fading style
  messageList.forEach((message) => {
    message.fade();
    message.display();
  });
}

class Message {
  constructor(author, text) {
    this.text = text;
    this.author = author;

    this.opacity = 100;
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
