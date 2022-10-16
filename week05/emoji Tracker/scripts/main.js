// this app uses emojiTracker STREAM API: https://github.com/emojitracker/emojitrack-streamer-spec/blob/master/README.md
// Unlike the REST API, it constantly receives events as long as the connection is open
// So instead of doing fetch(), I'm using EventSource.onmessage
// for more about SSE (server-sent events), visit https://developer.mozilla.org/en-US/docs/Web/API/EventSource

let detailEvtSource;
let messageList = [];

function setup() {
  let cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  cnv.position(windowWidth * 0.1, windowHeight * 0.2);

  updateEvtSource();
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

function updateEvtSource() {
  // get DOM select valuse, and pass it to endpoint URL
  emojiID = document.getElementById("emoji").value;
  detailEndpoint =
    "https://stream.emojitracker.com/subscribe/details/" + emojiID;

  // close connection of event source
  if (detailEvtSource) {
    detailEvtSource.close();
    console.log("closed");
  }

  // clear existing messages
  messageList = [];

  // connect to STREAM API
  detailEvtSource = new EventSource(detailEndpoint);
  // receive data, creat Message object, and push to the end of the messageList
  detailEvtSource.addEventListener(`stream.tweet_updates.${emojiID}`, (e) => {
    const response = JSON.parse(e.data);
    const msg = new Message(response.screen_name, response.text);
    messageList.push(msg);
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
    textFont("Orbitron");
    fill(255, 251, 171, this.opacity); // bright yellow
    text(this.formattedText(), 0, this.y, width);
  }

  fade() {
    if (this.opacity > 0) {
      this.opacity -= messageList.length * 0.1;
    }
  }
}
