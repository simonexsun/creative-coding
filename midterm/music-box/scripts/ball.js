class Ball {
  constructor(t) {
    this.x = random(width / 2);
    this.y = random(height / 2);
    this.d = random(5, 15);
    this.colorGold = color(215, 190, 105);
    this.theta = random(-TWO_PI, TWO_PI);
    this.intensity = t;
  }

  circle(vol, input) {
    this.d = 25;
    push();
    noStroke();
    fill(this.colorGold);

    // smoothen the movement
    let easing = 0.5;
    let intensity = map(input, 216, 331, 250, 0.1);

    let targetX = intensity * vol * sin(millis() * 0.001);
    let dx = targetX - this.x;
    this.x += dx * easing;

    let targetY = intensity * vol * cos(millis() * 0.001);
    let dy = targetY - this.y;
    this.y += dy * easing;
  }

  bounce(input) {
    // inspired by N1U on dribble https://dribbble.com/shots/11429742-Defend-the-Cube
    stroke(this.colorGold);
    strokeWeight(1);
    let intensity = map(input, 180, 380, 2, 0.05);

    // method 1, spin full circle, but effect other movements
    // rotate(frameCount * 0.01);

    //method 2, spin full circle in tan()/cos(), but doesn't bounce, and effect other movements
    // rotate(-HALF_PI);
    // rotate(cos(millis()*0.001)*speed);
    // translate(0, sin(millis()* 0.001)*intensity);

    // method 3, bounce independently
    this.x = 0;
    this.y += sin(millis() * 0.001) * intensity;
    push();
    rotate(this.theta);
  }

  amplify(vol) {
    this.x = 0;
    this.y = 0;
    push();
    noFill();
    strokeWeight(7);
    stroke(this.colorGold);

    let intensity = 300;

    // amplify with easing
    // let easing = 0.5;
    // let targetD = intensity * vol;
    // let dd = targetD - this.d;
    // this.d = dd * easing;

    // without easing
    this.d = vol * intensity;
  }

  display() {
    circle(this.x, this.y, this.d);
    pop();
  }
}
