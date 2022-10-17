// this app uses emojiTracker STREAM API: https://github.com/emojitracker/emojitrack-streamer-spec/blob/master/README.md
// Unlike the REST API, it constantly receives events as long as the connection is open
// So instead of doing fetch(), I'm using EventSource.onmessage
// for more about SSE (server-sent events), visit https://developer.mozilla.org/en-US/docs/Web/API/EventSource

let detailEvtSource;
let messageList = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight * 0.7);
  // generate canvas in element with id "myCanvas"
  cnv.parent("myCanvas");
  // canvas inner glow
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 7;
  drawingContext.shadowColor = color(255, 251, 171);

  updateEvtSource();
}

function draw() {
  background(0, 0, 0);
  // canvas inner glow
  fill(0, 0, 0, 0);
  rect(0, 0, width, height);

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
    this.y = random(height * 0.02, height * 0.8);
  }

  formattedText() {
    return `${this.author}: ${this.text}`;
  }

  display() {
    textSize(15);
    textFont("Orbitron");
    fill(255, 251, 171, this.opacity); // bright yellow
    text(this.formattedText(), width * 0.02, this.y, width);
  }

  fade() {
    if (this.opacity > 0) {
      this.opacity -= messageList.length * 0.1;
    }
  }
}
