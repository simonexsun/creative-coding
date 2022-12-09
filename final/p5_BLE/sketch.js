/*

This is the drawing part; based on this example: https://editor.p5js.org/aferriss/sketches/S1UTHZBHm

*/
let myValue = 0;

let graphValues = [];
let numPts = 100;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight / 2);
  bleSetup();
  for (let i = 0; i < numPts; i++) {
    graphValues.push(0);
  }
}
//Whenever we get an linebreak, we take the current value, and add it to the array, while shifitng all of it's values one postition.
function handleLineBreak(value) {
  graphValues.shift();
  graphValues.push(value);
  myValue = value;
}

function draw() {
  background("#f5f6fa");
  drawLines();
  noStroke();
  textAlign(RIGHT);
  text(myValue, width - 10, getY(myValue));
  textAlign(LEFT);
  text("max: " + Math.max(...graphValues), 10, 10);
}
//This is 'stolen' from https://editor.p5js.org/aferriss/sketches/S1UTHZBHm
function drawLines() {
  stroke("#00a8ff");
  strokeWeight(5);
  // draw lines
  let px = 0;
  let py = getY(graphValues[0]);
  for (let i = 0; i < graphValues.length; i++) {
    let x = i * (width / (numPts - 1));
    let y = getY(graphValues[i]);
    line(px, py, x, y);

    //store the last position
    px = x;
    py = y;
  }
}

//I googled https://medium.com/@vladbezden/how-to-get-min-or-max-of-an-array-in-javascript-1c264ec6e1aa to make this work, these three dots are using the array-elements as argument for a function.
function getY(value) {
  return map(
    value,
    Math.min(0, ...graphValues),
    Math.max(...graphValues),
    height,
    0
  );
}
