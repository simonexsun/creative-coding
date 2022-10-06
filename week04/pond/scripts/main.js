let s;
let waterColor, leafColor;
let ripples = [];
let leaves = [];

function setup() {
  createCanvas(windowWidth, windowWidth);
  s = new Scribble();

  waterColor = color(182, 201, 185);
  leafColor = color(90, 140, 127);

  //create objects
  for(let i = 0; i < 10; i ++){
    leaves.push(new Leaf());
  }
    console.log(leaves);
  detectCollision();
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

function detectCollision(){
  for(let i = 0; i < leaves.length-1; i ++){
    for(let j = i+1; j < leaves.length-1; j++){
      // get distance between two leaves
      var d = dist(leaves[i].x, leaves[i].y, leaves[j].x, leaves[j].y);
      // there is collision if distance between two is less than sum of two radius
      if (d <= leaves[i].d/2 + leaves[j].d/2) {
        console.log(`collide ${i}`);
        // remove objects that collide
        leaves.splice(j,j);
      }
    }
  }
  console.log(leaves);
}
