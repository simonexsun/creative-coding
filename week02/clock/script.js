let moon_and_sun;
let b1, b2, c1, c2;
let tree;

function setup() {
  moon_and_sun = new Stars(50);
  createCanvas(700, 300);
  background("#e0e4cc");
  smooth();
  tree = new Tree();
  b1 = color(36, 117, 146);
  b2 = color(252, 153, 152);
  c1 = color(4, 34, 47);
  c2 = color(118, 37, 73);
}

function draw() {
  background("#FCF6E4");
  rectMode(CENTER);
  drawGround();
  if (isDay()) {
    tree.grow(
      width / 2 - 10,
      height / 2 - 100,
      15, 
      map(minute(), 0, 59, 0, (height * 2) / 3), b2, b1
    );
  } else {
    tree.grow(
      width / 2 - 10,
      height / 2 - 100,
      15,
      map(minute(), 0, 59, 0, (height * 2) / 3), c2, c1
    );
  }
  moon_and_sun.drawStars();
}

function drawGround() {
  if (isDay()) {
    fill(b1);
  } else {
    fill(c1);
  }
  rect(
    0,
    (height * 2) / 3 + 60,
    map(hour(), 0, 12, 0, width),
    (height * 2) / 5
  );
}

function isDay() {
  let flag = true;
  let day = second() <= 52 && second() > 23;
  if (day == true) {
    drawSky(0, 0, width, (height * 2) / 3, b1, b2);
    flag = true;
  } else if ((day = second() > 52 || second() <= 23)) {
    drawSky(0, 0, width, (height * 2) / 3, c1, c2);
    flag = false;
  }
  return flag;
}

function drawSky(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let interval = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, interval);
    stroke(c);
    line(x, i, x + w, i);
  }
}

class Stars {
  constructor(r) {
    this.radius = r;
  }

  drawStars() {
    push();
    translate(width / 2, (height * 2) / 3);
    let angle = map(second(), 0, 59, 0, 2 * PI);
    rotate(angle);
    noStroke();
    fill(255, 0, 0);
    circle(160, 160, this.radius);
    fill(255);
    circle(-160, -160, this.radius);
    pop();
  }
}

class Tree {
  constructor() {
    this.height = 0;
  }

  grow(x, y, w, h, c1, c2) {
    this.height = map(minute(), 0, 59, (height * 2) / 3, 0);
    //rectMode(CENTER);
    for (let i = y + h; i >= y; i--) {
      let interval = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, interval);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}
