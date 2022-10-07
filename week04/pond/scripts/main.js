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
  for(let i = 0; i < width/8; i ++){
    leaves.push(new Leaf());
  }
  console.log(leaves);
  removeCollideLeaves();
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

function mouseReleased() {
  makeNewRipple();
}

function mouseDragged(){
  console.log('dragged');
  leaves.forEach((leaf) => {
    if(isMouseInside(leaf.x, leaf.y, leaf.d/2)){
      leaf.x = mouseX;
      leaf.y = mouseY;
    }
  });
}

function makeNewRipple() {
  let newRipple = new Ripple();
  ripples.push(newRipple);
  console.log(ripples);
}

function isMouseInside(x, y, r){
  let d = dist(mouseX, mouseY, x, y);
  if(d <= r){
    return true; 
  } else {
    return false; 
  }
}

function removeCollideLeaves(){
  // detect the collision of leaves
  for(let i = 0; i < leaves.length-1; i ++){
    for(let j = i+1; j < leaves.length-1; j++){
      // get distance between two leaves
      let d = dist(leaves[i].x, leaves[i].y, leaves[j].x, leaves[j].y);
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
