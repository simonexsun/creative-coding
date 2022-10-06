let s;
let waterColor, leafColor;
let ripples = [];
let leaves = [];

function setup() {
  createCanvas(400, 400);
  s = new Scribble();

  waterColor = color(182, 201, 185);
  leafColor = color(90, 140, 127);

  //create objects
  for(let i = 0; i < 5; i ++){
    leaves.push(new Leaf());
  }
}

function draw() {
  background(waterColor);
  frameRate(5);
  ripples.forEach((ripple) => {
    ripple.display();
  });

  leaves.forEach((leaf) => {
    leaf.display();
  });
}

function mousePressed() {
  makeNewRipple();
}

function makeNewRipple() {
  let newRipple = new Ripple();
  ripples.push(newRipple);
  console.log(ripples);
}
