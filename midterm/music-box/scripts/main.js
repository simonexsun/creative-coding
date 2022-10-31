// loading music tutorial from https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07
// easing tutorial from https://p5js.org/examples/input-easing.html
// sound tracks from artist Helios, aquired from http://unseen-music.com/yume/loops/trimmed/

let song, amp;
let circlingBall, ampBall, lines, mybox;
let bouncingBallUI, lineUI, circlingBallUI, boxUI;
let bouncingBalls = [];

let myFont;

function preload() {
  // preload audio
  song = loadSound("audio/giorgui-cut.mp3");
  // preload font
  myFont = loadFont("fonts/PoiretOne-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // loop audio
  song.loop();
  amp = new p5.Amplitude();
  // Create objects
  for (let i = 0; i < 10; i++) {
    bouncingBalls.push(new Ball());
  }
  circlingBall = new Ball();
  ampBall = new Ball();
  myBox = new Box();
  lines = new LineGroup(40, 200);
  // Create UI
  bouncingBallUI = new BouncingBallUI(width / 6, height / 3, 15, height / 5);
  lineUI = new LineUI(width / 6, (height * 2) / 3, 15, height / 5);
  circlingBallUI = new CirclingBallUI(
    (width * 5) / 6,
    height / 3,
    height / 16, // track radius
    7 // ellipse radius
  );
  boxUI = new BoxUI((width * 5) / 6, (height * 2) / 3, height / 8, 7);
}

function draw() {
  background(0);

  //display text if the music is not playing
  if (getAudioContext().state == "suspended") {
    push();
    textFont(myFont);
    textSize(20);
    fill("white");
    textAlign(CENTER, BOTTOM);
    text("click anywhere to play music", -width / 2, height * 0.4, width);
    pop();
  }

  let vol = amp.getLevel();

  // operate UI methods
  bouncingBallUI.interact();
  bouncingBallUI.display();
  lineUI.interact();
  lineUI.display();
  circlingBallUI.interact();
  circlingBallUI.display();
  boxUI.interact();
  boxUI.display();

  // operate object methods
  lines.amplify(vol, lineUI.lineY);
  lines.display();
  bouncingBalls.forEach((ball) => {
    ball.bounce(bouncingBallUI.ellipseY);
    ball.display();
  });
  circlingBall.circle(vol, circlingBallUI.ellipseY);
  circlingBall.display();
  ampBall.amplify(vol, circlingBallUI.ellipseY);
  ampBall.display();
  myBox.display(boxUI.movement);
  console.log(boxUI.movement);
}

// Chrome 70 will require user gestures to enable web audio api > https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
// Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}
