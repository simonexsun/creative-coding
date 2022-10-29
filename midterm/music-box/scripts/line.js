class LineGroup {
  constructor(length, number) {
    this.x = 0; // Xposition of signle line ending point
    this.y = 0; // Yposition of signle line ending point
    this.l = length; // single line length
    this.offset = 1;
    this.n = number; // number of bars
    this.colorGold = color(215, 190, 105);
  }

  amplify(vol, input) {
    let intensity = map(input, 456, 596, 300, 5);
    this.offset = vol * intensity;
    // this.l = vol * intensity;
  }

  display() {
    noFill();
    strokeWeight(0.5);
    stroke(this.colorGold);
    for (let i = 0; i < this.n; i++) {
      push();
      rotate(radians((360 / this.n) * i));
      line(0, this.offset + this.l, 0, this.offset);
      pop();
    }
  }
}
