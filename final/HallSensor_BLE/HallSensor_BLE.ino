//Simple sketch to access the internal hall effect detector on the esp32.
//values can be quite low.
//Brian Degger / @sctv

// BleSerial library usage: https://github.com/avinabmalla/ESP32_BleSerial/blob/master/examples/BleSerial_Hello/bleserial_hello.ino
#include "BLESerial.h"

int val = 0;
BLESerial bleSerial;

void setup() {
  Serial.begin(115200);
  bleSerial.begin("ESP32");
}

void loop() {
  val = hallRead();
  Serial.print("sensor = ");
  Serial.println(val);

  //If we're connected
  if (bleSerial.connected()) {
    //Send the analog value
    bleSerial.println(val);
    //Wait for 0.1 second
    delay(100);
  }
}
