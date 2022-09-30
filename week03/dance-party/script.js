// loading music tutorial from https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07
// easing tutorial from https://p5js.org/examples/input-easing.html

let song, amp;
let circlingBall, ampBall, lines, mybox;
let bouncingBalls = [];

function preload() {
  // preload audio
  song = loadSound("audio/giorgui-cut.mp3");
}

function setup() {
  createCanvas(325, 325, WEBGL);

  // loop audio
  song.loop();
  amp = new p5.Amplitude();

  //Create objects
  for (let i = 0; i < 10; i++) {
    bouncingBalls.push(new Ball());
  }
  circlingBall = new Ball();
  ampBall = new Ball();
  myBox = new Box();
  lines = new LineGroup(40, 200);
}

function draw() {
  background(0);

  let vol = amp.getLevel();

  // operate object methods
  bouncingBalls.forEach((ball) => {
    ball.bounce();
    ball.display();
  });
  circlingBall.circle(vol);
  circlingBall.display();
  ampBall.amplify(vol);
  ampBall.display();
  myBox.display();
  lines.amplify(vol);
  lines.display();
}

// function touchStarted() {
//   getAudioContext().resume();
// }
