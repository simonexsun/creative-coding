class Ball {
  constructor(t) {
    this.x = random(width / 2);
    this.y = random(height / 2);
    this.d = random(5, 15);
    this.color = color(215, 190, 105); // defult golden
    this.theta = random(-TWO_PI, TWO_PI);
    this.intensity = t;
  }

  circle(vol, input) {
    this.d = 80;
    this.color = color(169, 215, 105); // green

    push();
    noStroke();
    fill(this.color);

    // smoothen the movement
    let easing = 0.5;
    let intensity = map(input, 216, 331, 600, 10);

    let targetX = intensity * vol * sin(millis() * 0.001);
    let dx = targetX - this.x;
    this.x += dx * easing;

    let targetY = intensity * vol * cos(millis() * 0.001);
    let dy = targetY - this.y;
    this.y += dy * easing;
  }

  bounce(vol, input) {
    // inspired by N1U on dribble https://dribbble.com/shots/11429742-Defend-the-Cube
    this.color = color(255, 205, 0); // yellow
    stroke(this.color);
    strokeWeight(5);
    let intensity = map(input, 239, 328, 50, 15) * vol;

    // bounce independently
    this.x = 0;
    this.y += sin(millis() * 0.001) * intensity;
    push();
    rotate(this.theta);
  }

  amplify(vol, input) {
    this.x = 0;
    this.y = 0;
    this.color = color(169, 215, 105); // green
    push();
    noFill();
    strokeWeight(7);
    stroke(this.color);

    let intensity = map(input, 216, 331, 600, 10);

    // without easing
    this.d = vol * intensity;
  }

  display() {
    circle(this.x, this.y, this.d);
    pop();
  }
}
