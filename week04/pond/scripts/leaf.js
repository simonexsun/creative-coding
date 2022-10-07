class Leaf {
  constructor() {
    this.d = random(width / 10, width / 3);
    this.x = random(this.d / 2, width - this.d / 2);
    this.y = random(this.d / 2 + height * 0.2, height * 0.98 - this.d / 2);
    this.start = random(0, 2 * PI);
    this.end = this.start + QUARTER_PI;
  }

  display() {
    // leaf base filling
    noStroke();
    fill(leafColor);
    ellipse(this.x, this.y, this.d, this.d);

    // leaf texture
    stroke("white");
    strokeWeight(0.5);
    for (let i = 0; i < 16; i++) {
      push();
      translate(this.x, this.y);
      rotate((QUARTER_PI / 2) * i);
      s.scribbleLine(0, 0, 0, 0 - this.d / 2);
      pop();
    }

    // leaf outline
    noFill();
    strokeWeight(2);
    s.scribbleEllipse(this.x, this.y, this.d - 5, this.d - 5);
    push();
    translate(this.x, this.y);
    rotate(this.start + HALF_PI * 1.55);
    s.scribbleLine(0, 0, 0, 0 - this.d / 2);
    pop();
    push();
    translate(this.x, this.y);
    rotate(this.end + QUARTER_PI * 0.9);
    s.scribbleLine(0, 0, 0, 0 - this.d / 2);
    pop();

    // leaf gap
    noStroke();
    fill(waterColor);
    arc(this.x, this.y, this.d + 5, this.d + 5, this.start, this.end);
  }

  enlarge() {
    this.d *= 1.3;
  }

  reduct() {
    this.d /= 1.3;
  }
}
