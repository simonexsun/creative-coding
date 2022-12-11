/*
BLE variables 
This part is based on https://github.com/ITPNYU/p5.ble.js/tree/master/examples/BluefruitLE
*/

// The serviceUuid must match the serviceUuid of the device you would like to connect
const serviceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const txCharacteristic = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"; // transmit is from the phone's perspective
const rxCharacteristic = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"; // receive is from the phone's perspective

let myCharacteristic;
let myBLE;
let receiveText;

/*
BLE functions 
*/

function bleSetup() {
  myBLE = new p5ble();
  createElement("br");

  // Create a 'Connect and Start Notifications' button
  const connectButton = createButton("Connect");
  connectButton.mousePressed(connectAndStartNotify);
  connectButton.style(
    "width: 33.3%; height: 150px; border-radius: 100px; border:none; 100px; fontSize: 20pt; background-color: #7dafff;"
  );
  // Create a 'Reset Data' button
  const resetButton = createButton("Reset");
  resetButton.style(
    "width: 33.3%; height: 150px; border-radius: 100px; border:none; 100px; fontSize: 20pt; background-color: #88d193;"
  );
  resetButton.mousePressed(resetData);
  // Create a 'Stop Notifications' button
  const stopButton = createButton("Stop");
  stopButton.style(
    "width: 33.3%; height: 150px; border-radius: 100px; border:none; 100px; fontSize: 20pt; background-color: #ff7d7d;"
  );
  stopButton.mousePressed(stopNotifications);
}

function connectAndStartNotify() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log("error: ", error);
  for (let i = 0; i < characteristics.length; i++) {
    if (rxCharacteristic == characteristics[i].uuid) {
      myCharacteristic = characteristics[i];
      myBLE.startNotifications(myCharacteristic, handleNotifications, "string");
    }
  }

  // Start notifications on the first characteristic by passing the characteristic
  // And a callback function to handle notifications
  //myBLE.startNotifications(myCharacteristic, handleNotifications);
  // You can also pass in the dataType
  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
  // myBLE.startNotifications(myCharacteristic, handleNotifications, 'string');
}

// A function that will be called once got characteristics
function handleNotifications(data) {
  // get everything before "\n", and turn that from a string to a number
  // The first argument is the string to convert. The second argument is called the radix -- the base number used in mathematical systems. For our use, it should always be 10.
  const num = parseInt(data.trimEnd(), 10);
  if (num) {
    updateCounter(num);
  }
}

// A function to stop notifications
function stopNotifications() {
  myBLE.stopNotifications(myCharacteristic);
}

/*
UI-related variables 
*/

let turns = 0;
const diameter = 2; // 2 inches wheel diameter
let distance = 0; // distance = turns * PI * diameter
let previousInstantDistance = 0;
let speed = 0; // speed = distance / time

let lastCounter;
let offset = 0;

const targetFrameRate = 60;

let randomColor;

/*
UI functions 
*/

function setup() {
  canvas = createCanvas(windowWidth, windowHeight * 0.9);
  bleSetup();
  frameRate(targetFrameRate);
  randomColor = color(random(100, 255), random(100, 255), random(100, 255));
}

function draw() {
  background("#f5f6fa");
  updateDistance();
  // update speed every second
  const multiplier = 5;
  if (frameCount % (targetFrameRate * multiplier) === 0) {
    updateSpeed();
  }

  textAlign(LEFT);
  textSize(50);
  fill(0);
  text(`diameter: ${diameter} inches`, 10, 100);
  text(`turns: ${turns} times`, 10, 200);
  text(`total distance: ${updateDistance() / 12} feet`, 10, 400);
  text(`instant speed: ${speed} turns/sec (${mph(speed)} mph)`, 10, 500);

  fill(randomColor);
  noStroke();
  let mappedSpeed = map(speed, 0, 25, 100, 500);
  ellipse(width / 2, height / 2, mappedSpeed);
}

// convert turns per second to miles per hour
function mph(speed) {
  const distOfTurn = PI * diameter; // in inches
  const turnsPerHour = speed * 3600;
  const inchesPerMile = 63360;
  return round((distOfTurn * turnsPerHour) / inchesPerMile, 2);
}

function updateSpeed() {
  const dist = getInstantDistance();
  speed = dist; // turns/sec
}

function getInstantDistance() {
  // calculate the distance since last excution of this function
  const instantDistance = distance - previousInstantDistance;
  // store current distance as ${previousInstantDistance} for next time
  previousInstantDistance = distance;
  return instantDistance;
}

function updateDistance() {
  // alculate the total distance since the begining
  distance = turns;
  return turns * PI * diameter;
}

// A function to set rotation counts back to 0
function resetData() {
  offset = lastCounter;
  // console.log(`${turns}`); // ${turns} stores the turns from the session before reset
}

/**
 * Update the counter in the UI.
 *
 * @param {number} value
 */
function updateCounter(value) {
  lastCounter = value;
  turns = value - offset;
}
