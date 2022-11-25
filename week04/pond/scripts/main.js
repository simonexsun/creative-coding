let s, seed; // scribble
let myFont, frogGif; // UI
let waterSounds = [];
let waterBloop1, waterBloop2, waterBloop3, frogCall; // sound variables
let waterColor, leafColor; // color variables
let ripples = [];
let leaves = [];
let frog, frogX, frogY, frogFound; // object variables

// Serial variables
let serial; // variable to hold an instance of the serialport library
let portName = "/dev/tty.usbmodem1101"; // fill in your serial port name here
let inData; // for incoming serial data (in the form of JSON)
let portSelector;

function preload() {
  // preload audio
  waterBloop1 = loadSound("./audios/water-bloop-1.mp3");
  waterBloop2 = loadSound("./audios/water-bloop-2.mp3");
  waterBloop3 = loadSound("./audios/water-bloop-3.mp3");
  frogCall = loadSound("./audios/frog-crock.mp3");

  //preload img
  frogGif = loadImage("img/frog.png");

  // preload font
  myFont = loadFont("fonts/IndieFlower-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new Scribble();
  seed = 0;

  //define sound
  waterSounds.push(waterBloop1);
  waterSounds.push(waterBloop2);
  waterSounds.push(waterBloop3);

  // define color
  waterColor = color(182, 201, 185);
  leafColor = color(90, 140, 127);

  //create objects
  for (let i = 0; i < width / 10; i++) {
    leaves.push(new Leaf());
  }
  console.log(leaves);
  removeCollideLeaves();

  // design frog position and size
  frogX = leaves[2].x;
  frogY = leaves[2].y;
  frogSize = leaves[2].d * 0.6;
  frogFound = false;

  // Serial setup
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing
  serial.list(); // list the serial ports
  serial.openPort(portName); // open a serial port
}

function draw() {
  background(waterColor);
  // display objects at low frame rate
  // frameRate(5);

  ripples.forEach((ripple) => {
    ripple.display();
  });

  displayUI();

  // update seed at low frame rate
  if (frameCount % 30 == 0) {
    seed++;
  }
  randomSeed(seed);

  // display frog
  imageMode(CENTER);
  image(frogGif, frogX, frogY, frogSize, frogSize);

  leaves.forEach((leaf) => {
    leaf.display();
  });

  console.log(inData);
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

  if (!frogFound) {
    if (!isFrogCovered(leaves[2].x, leaves[2].y, leaves[2].d / 2)) {
      // image(frogGif, frogX, frogY, frogSize, frogSize);
      frogCall.play();
      frogFound = true;
    }
  }
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

function isFrogCovered(x, y, r) {
  let d = dist(frogX, frogY, x, y);
  if (d <= r / 2) {
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

function displayUI() {
  let margine = height * 0.05;
  let small_font_size = width / 35;
  let big_font_size = width / 20;
  let line_space = small_font_size * 1.2;

  fill(255);
  stroke(255);
  strokeWeight(0.5);

  textFont(myFont);
  textAlign(CENTER, TOP);

  textSize(small_font_size);
  text("drag leaves to", width / 2, margine);

  textSize(big_font_size);
  text("find the frog !!", width / 2, margine + line_space);

  stroke(255);
  strokeWeight(2);
  noFill();
  rectMode(TOP);
  // s.scribbleFilling(width / 2, height * 0.13, 5, 20);
  s.scribbleRect(
    width / 2,
    height * 0.13,
    width / 3,
    small_font_size + big_font_size + margine
  );
}

/* ==========================================================================
Below are functions for serial communication */

// make a serial port selector object:
function printList(portList) {
  // create a select object:
  portSelector = createSelect();
  portSelector.position(10, 10);
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // add this port name to the select object:
    portSelector.option(portList[i]);
  }
  // set an event listener for when the port is changed:
  portSelector.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = portSelector.value();
  // if there's a port open, close it:
  if (serial.serialport != null) {
    serial.close();
  }
  // open the new port:
  serial.openPort(item);
}

function serverConnected() {
  console.log("connected to server.");
}

function portOpen() {
  console.log("the serial port opened.");
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  inString = serial.readLine();
  inData = JSON.parse(inString); // parse string into json
}

function serialError(err) {
  console.log("Something went wrong with the serial port. " + err);
}

function portClose() {
  console.log("The serial port closed.");
}
