// ripple effect from https://editor.p5js.org/chjno/sketches/BkbTpyojZ

class Ripple {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.outerDiam = 0;
  }

  display() {
    //stop looping when the ripple is out of canvas frame
    if (this.outerDiam < width * 3) {
      for (let i = 0; i < 5; i++) {
        let diam = this.outerDiam - (10 + i * 2) * i;
        if (diam > 0) {
          // the bigger the circle gets, the closer its color is too the waterColor: color(182,201,185); starting from color(87,117,91)
          let fadeR = map(diam, 0, width * 1, 87, 182);
          let fadeG = map(diam, 0, width * 1, 117, 201);
          let fadeB = map(diam, 0, width * 1, 91, 185);
          stroke(fadeR, fadeG, fadeB);
          strokeWeight(0.5);
          noFill();
          ellipse(this.x, this.y, diam);
        }
      }
      this.outerDiam = this.outerDiam + 2;
    }
  }
}
