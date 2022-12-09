/*

This is the drawing part; based on this example: https://editor.p5js.org/aferriss/sketches/S1UTHZBHm

*/
let turns = 0;
const diameter = 10;
let speed = 0;

let lastCounter;
let offset = 0;

let life_time_value;
let previous_lifetime_value;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight * 0.75);
  bleSetup();
}

/**
 * Update the counter in the UI.
 *
 * @param {number} value
 */
function updateCounter(value) {
  lastCounter = value;
  turns = value;
}

function draw() {
  background("#f5f6fa");

  textAlign(LEFT);
  textSize(100);
  text(`speed: `, 10, 100);
  text(`turns: ${turns}`, 10, 200);
}

function getSpeed() {}

// A function to set rotation counts back to 0
function resetData() {
  offset = lastCounter;
}
