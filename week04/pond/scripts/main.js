let s; // scribble
let myFont;
let waterSounds = [];
let waterBloop1, waterBloop2, waterBloop3; // sound variables
let waterColor, leafColor; // color variables
let ripples = [];
let leaves = []; // object variables

function preload() {
  // preload audio
  waterBloop1 = loadSound("./audios/water-bloop-1.mp3");
  waterBloop2 = loadSound("./audios/water-bloop-2.mp3");
  waterBloop3 = loadSound("./audios/water-bloop-3.mp3");

  // preload font
  // myFont = loadFont("fonts/PoiretOne-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new Scribble();

  //define sound
  waterSounds.push(waterBloop1);
  waterSounds.push(waterBloop2);
  waterSounds.push(waterBloop3);

  // define color
  waterColor = color(182, 201, 185);
  leafColor = color(90, 140, 127);

  //create objects
  for (let i = 0; i < width / 8; i++) {
    leaves.push(new Leaf());
  }
  console.log(leaves);
  removeCollideLeaves();
}

function draw() {
  background(waterColor);
  // display objects at low frame rate
  frameRate(5);

  ripples.forEach((ripple) => {
    ripple.display();
  });

  leaves.forEach((leaf) => {
    leaf.display();
  });
}

function mousePressed() {
  leaves.forEach((leaf) => {
    if (isMouseInside(leaf.x, leaf.y, leaf.d / 2)) {
      leaf.enlarge();
    }
  });
}

function mouseDragged() {
  leaves.forEach((leaf) => {
    if (isMouseInside(leaf.x, leaf.y, leaf.d / 2)) {
      leaf.x = mouseX;
      leaf.y = mouseY;
    }
  });
}

function mouseReleased() {
  makeNewRipple();

  let waterBloop = random(waterSounds);
  waterBloop.play();

  leaves.forEach((leaf) => {
    if (isMouseInside(leaf.x, leaf.y, leaf.d / 2)) {
      leaf.reduct();
    }
  });
}

function makeNewRipple() {
  let newRipple = new Ripple();
  ripples.push(newRipple);
  console.log(ripples);
}

function isMouseInside(x, y, r) {
  let d = dist(mouseX, mouseY, x, y);
  if (d <= r) {
    return true;
  } else {
    return false;
  }
}

function removeCollideLeaves() {
  // detect the collision of leaves
  for (let i = 0; i < leaves.length - 1; i++) {
    for (let j = i + 1; j < leaves.length - 1; j++) {
      // get distance between two leaves
      let d = dist(leaves[i].x, leaves[i].y, leaves[j].x, leaves[j].y);
      // there is collision if distance between two is less than sum of two radius
      if (d <= leaves[i].d / 2 + leaves[j].d / 2) {
        console.log(`collide ${i}`);
        // remove objects that collide
        leaves.splice(j, j);
      }
    }
  }
  console.log(leaves);
}
