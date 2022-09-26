// The cactus blooming animation is inspired by Daniel Shiffman's Recursive Tree Example https://processing.org/examples/tree.html

let moon_and_sun; // represents hour
let babyBlue, babyPink, oliveGreen, sunColor;
let tree; // represents minute

function setup() {
  createCanvas(325, 325);
  smooth();

  babyBlue = color(
    map(hour(), 0, 23, 36, 4),
    map(hour(), 0, 23, 117, 34),
    map(hour(), 0, 23, 146, 47)
  );
  babyPink = color(
    map(hour(), 0, 23, 252, 118),
    map(hour(), 0, 23, 153, 37),
    map(hour(), 0, 23, 152, 73)
  );

  oliveGreen = color(24, 96, 72);
  sunColor = color(
    map(hour(), 0, 23, 255, 254),
    map(hour(), 0, 23, 0, 252),
    map(hour(), 0, 23, 0, 215)
  );
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
  let color1, color2;
  // Start the trunck from the bottom of the screen
  translate(width / 2, height);
  fill(oliveGreen);
  noStroke();
  let cactusSize = map(minute(), 0, 59, 50, 200);

  // draw the top round part of the cactus
  arc(0, -cactusSize / 2, cactusSize, cactusSize, PI, 2 * PI, CHORD);

  // draw the bottom stem of the cactus with a gradient
  // check day or night for color selection

  color1 = babyPink;
  color2 = oliveGreen;
  for (let i = cactusSize; i >= 0; i--) {
    let interval = map(i, 0, cactusSize, 0, 1);
    let c = lerpColor(color1, color2, interval);
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
  c = color(238, 232, 170);
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

  color1 = babyBlue;
  color2 = babyPink;

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
    c = sunColor;
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
