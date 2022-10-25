class BouncingBallUI {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ellipseY = y;
    this.thickness = 0.5;
    this.colorGold = color(215, 190, 105);
  }

  interact() {
    push();
    // shift canvas
    translate(-width / 2, -height / 2);

    if (dist(mouseX, mouseY, this.x, this.y) <= this.h / 2 - this.w / 2) {
      // highlight on hover
      fill(255, 255, 255, 15);
      noStroke();
      ellipse(this.x, this.y, this.h);

      // interaction on mouse pressed
      if (mouseIsPressed) {
        // thicken ellipse stroke
        this.thickness = 3;
        // move ellipse based on mouse positions
        this.ellipseY = mouseY;
      } else {
        // reverse ellipse stroke
        this.thickness = 0.5;
      }
    } else {
      // reverse ellipse stroke
      this.thickness = 0.5;
    }
    pop();
  }

  display() {
    push();
    // shift canvas
    translate(-width / 2, -height / 2);

    // display ellipse
    noFill();
    strokeWeight(this.thickness);
    stroke(this.colorGold);
    ellipse(this.x, this.ellipseY, this.w);
    // display track
    strokeWeight(0.5);
    line(this.x, this.y - this.h / 2, this.x, this.y + this.h / 2);
    pop();
  }
}
