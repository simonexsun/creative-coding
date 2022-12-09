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
  connectButton.style("width: 100%; height: 100px; fontSize: 30pt;");
  createElement("br");
  // Create a 'Stop Notifications' button
  const stopButton = createButton("Stop");
  stopButton.style("width: 100%; height: 100px; fontSize: 30pt;");
  stopButton.mousePressed(stopNotifications);
  createElement("br");

  receiveText = createElement("textarea", "").id("receiveText");
  receiveText.style("width: 100%; height: 100px; ");
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
  let receiveText = document.getElementById("receiveText");
  receiveText.value += data;
  receiveText.scrollTop = receiveText.scrollHeight;
  if (data === "\n") {
    handleLineBreak(receiveText.value);
    receiveText.value = "";
  }
}

// A function to stop notifications
function stopNotifications() {
  myBLE.stopNotifications(myCharacteristic);
}
