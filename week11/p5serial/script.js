let serial; // variable to hold an instance of the serialport library
let portName = "/dev/tty.usbmodem1101"; // fill in your serial port name here
let inData; // for incoming serial data
let portSelector;

let ellipseX, ellipseY;

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.openPort(portName); // open a serial port

  ellipseX = width / 2;
  ellipseY = height / 2;
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("sensor value: " + inData, 30, 50);

  if (inData == 10) {
    ellipseX -= 2;
  } else if (inData == 01) {
    ellipseX += 2;
  }
  ellipse(ellipseX, ellipseY, 20);
}

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
  inData = inString;
}

function serialError(err) {
  console.log("Something went wrong with the serial port. " + err);
}

function portClose() {
  console.log("The serial port closed.");
}
