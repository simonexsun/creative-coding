class Box {
  constructor() {
    this.edge = random(150, 150);
    this.color = color(105, 204, 215); // blue
  }

  display(input) {
    let intensity = map(input, -70, 70, 0.01, 0);
    noFill();
    strokeWeight(0.5);
    stroke(this.color);
    push();
    rotateX(frameCount * intensity);
    rotateY(frameCount * intensity);
    box(this.edge);
    pop();
  }
}
