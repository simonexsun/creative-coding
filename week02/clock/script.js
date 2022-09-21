let moon_and_sun; // represents hour
let lightBlue, lightPink, darkBlue, darkPink, green; // represents day or night
let tree; // represents minute

function setup() {
  createCanvas(700, 300);
  smooth();
  lightBlue = color(36, 117, 146);
  lightPink = color(252, 153, 152);
  darkBlue = color(4, 34, 47);
  darkPink = color(118, 37, 73);
  green = color(24, 96, 72);
  brightRed = color(255, 0, 0);
  glowingYellow = color(254,252,215);
}

function draw() {
  background("fff0f0");
  rectMode(CENTER);
  drawSky();

  drawTrunck();
  // Start the recursive flowering
  let flowerSize = map(minute(), 0, 59, 30, height/2*0.8);
  flower(flowerSize);
  drawStar();
}

function drawTrunck() {
  let color1;
  // Start the trunck from the bottom of the screen
  translate(width / 2, height);
  fill(green);
  noStroke();
  let cactusSize = map(minute(), 0, 59, 50, 200);

  // draw the top round part of the cactus
  arc(0, -cactusSize / 2, cactusSize, cactusSize, PI, 2 * PI, CHORD);

  // draw the bottom stem of the cactus with a gradient
  // check day or night for color selection
  if (isDay()) {
    color1 = lightPink;
  } else {
    color1 = darkPink;
  }
  for (let i = cactusSize; i >= 0; i--) {
    let interval = map(i, 0, cactusSize, 0, 1);
    let c = lerpColor(color1, green, interval);
    stroke(c);
    line(-cactusSize / 2, -i / 2, cactusSize / 2, -i / 2);
  }

  // Move to the end of the trunck for the flowering
  translate(0, -cactusSize);
}

function flower(h) {
  let c, theta;
  // pink flowers move based on seconds
  let a = map(millis(), 0, 1000 * 60, 0, 360);
  // Convert it to radians
  theta = radians(a);

  noFill();
  // check day or night for color selection
  if (isDay()) {
    c = lightPink;
  } else {
    c = darkPink;
  }
  stroke(c);
  strokeWeight(2);
  // Each flower will be half the size of the previous one
  h *= 0.5;
  // Exit recursive functions when the length of the flower is 10 pixels or less
  if (h > 2) {
    // right flowers
    push();
    rotate(theta); // Rotate by theta
    quad(-h / 2, 0, 0, -h, h / 2, 0, 0, h); // Draw the flower
    translate(0, -h); // Move to the end of the flower
    flower(h); // call myself to draw two new floweres
    pop();

    // left flowers
    push();
    rotate(-theta);
    quad(-h / 2, 0, 0, -h, h / 2, 0, 0, h);
    translate(0, -h);
    flower(h);
    pop();
  }
}

function isDay() {
  let isDay = hour() <= 17 && hour() > 7;
  return isDay;
}

function drawSky() {
  let x = 0;
  let y = 0;
  let w = width;
  let h = height;
  let color1, color2;
  if (isDay()) {
    color1 = lightBlue;
    color2 = lightPink;
  } else {
    color1 = darkBlue;
    color2 = darkPink;
  }
  for (let i = y; i <= y + h; i++) {
    let interval = map(i, y, y + h, 0, 1);
    let c = lerpColor(color1, color2, interval);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function drawStar() {
  // check day or night for color selection
  let c;
  if (isDay()) {
    c = brightRed;
  } else {
    c = glowingYellow;
  }
  
  push();
  // move the rotation point to the bottom-middle of the canvas
  translate(width/2, height);
  let a = map(hour(), 0, 23, 180, 360);
  let theta = radians(a);
  rotate(theta);
  noStroke();
  fill(c);
  circle(width/3, -height*3/4, 50);
  pop();
}
