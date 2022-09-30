class LineGroup {
  constructor(length, number) {
    this.x = 0; // Xposition of signle line ending point
    this.y = 0; // Yposition of signle line ending point
    this.l = length; // single line length
    this.offset = 1;
    this.n = number; // number of bars
    this.colorGold = color(215, 190, 105);
  }

  amplify(vol) {
    let intensity = 120;
    this.offset = vol * intensity;
    // this.l = vol * intensity;
  }

  display() {
    noFill();
    strokeWeight(0.5);
    stroke(this.colorGold);
    for (let i = 0; i < this.n; i++) {
      // push();
      rotate(radians((360 / this.n) * i));
      line(0, this.offset + this.l, 0, this.offset);
      // pop();
    }
  }
}

// the Ball class
class Ball {
  constructor() {
    this.x = random(width / 2);
    this.y = random(height / 2);
    this.d = random(5, 15);
    this.colorGold = color(215, 190, 105);
    this.theta = random(-TWO_PI, TWO_PI);
  }

  circle(vol) {
    this.d = 25;
    noStroke();
    fill(this.colorGold);

    // smoothen the movement
    let easing = 0.5;
    let intensity = 250;

    let targetX = intensity * vol * sin(millis() * 0.001);
    let dx = targetX - this.x;
    this.x += dx * easing;

    let targetY = intensity * vol * cos(millis() * 0.001);
    let dy = targetY - this.y;
    this.y += dy * easing;
  }

  bounce() {
    // inspired by N1U on dribble https://dribbble.com/shots/11429742-Defend-the-Cube
    stroke(this.colorGold);
    strokeWeight(1);
    let speed = 1;

    // method 1, spin full circle, but effect other movements
    // rotate(frameCount * 0.01);

    //method 2, spin full circle in tan()/cos(), but doesn't bounce, and effect other movements
    // rotate(-HALF_PI);
    // rotate(cos(millis()*0.001)*speed);
    // translate(0, sin(millis()* 0.001)*intensity);

    // method 3, bounce independently
    this.x = 0;
    this.y += sin(millis() * 0.001) * speed;
    rotate(this.theta);
  }

  amplify(vol) {
    this.x = 0;
    this.y = 0;
    noFill();
    strokeWeight(7);
    stroke(this.colorGold);

    let intensity = 300;

    // amplify with easing
    //     let easing = 0.5;
    //     let targetD = intensity * vol;
    //     let dd = targetD - this.d;
    //     this.d = dd * easing;

    // without easing
    this.d = vol * intensity;

    // Q: why does this.d = 0????
    // this.d *= vol * intensity;
    // console.log(vol * intensity);
  }

  display() {
    circle(this.x, this.y, this.d);
  }
}

// the box class
class Box {
  constructor() {
    this.edge = random(width / 4, width / 2);
    this.colorGold = color(215, 190, 105);
  }

  rotate() {
    noFill();
    strokeWeight(0.5);
    stroke(this.colorGold);
    // why does push and pop not work here?
    // push();
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    // pop();
  }

  display() {
    box(this.edge);
  }
}
