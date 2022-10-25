class Box {
  constructor() {
    this.edge = random(150, 150);
    this.colorGold = color(215, 190, 105);
  }

  display() {
    noFill();
    strokeWeight(0.5);
    stroke(this.colorGold);
    push();
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    box(this.edge);
    pop();
  }
}
