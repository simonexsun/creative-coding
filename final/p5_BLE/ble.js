/*
This is the bluetooth part based on https://github.com/ITPNYU/p5.ble.js/tree/master/examples/BluefruitLE this example
*/

// Copyright (c) 2018 p5ble
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// The serviceUuid must match the serviceUuid of the device you would like to connect

const serviceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const txCharacteristic = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"; // transmit is from the phone's perspective
const rxCharacteristic = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"; // receive is from the phone's perspective

let myCharacteristic;
let myBLE;
let receiveText;

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

  createElement("br");

  receiveText = createElement("textarea", "").id("receiveText");
  receiveText.style("width: 100%; height: 100px;  ");
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
    console.log(num);
    updateCounter(num);
  }
}

// A function to stop notifications
function stopNotifications() {
  myBLE.stopNotifications(myCharacteristic);
}
