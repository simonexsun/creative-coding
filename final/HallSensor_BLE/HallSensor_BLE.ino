// Simple sketch to access the internal hall effect detector on the esp32.
// Source code from Brian Degger / @sctv, https://www.hackster.io/lemio/create-apps-for-the-esp32-using-ble-through-p5-55292d

// BleSerial library usage: https://github.com/avinabmalla/ESP32_BleSerial/blob/master/examples/BleSerial_Hello/bleserial_hello.ino
#include <BleSerial.h>

int val = 0;
bool state;
bool previousState;
int counter = 0;
BleSerial bleSerial;

void setup()
{
  Serial.begin(115200);
  bleSerial.begin("ESP32");
  state = false;
  previousState = false;
}

void loop()
{
  val = hallRead();
  // register hall sensor state as HIGH if value passes certain threadhold
  if (val >= 100)
  {
    state = true;
  }
  else
  {
    state = false;
  }
  updateCounter();

  // If bluetooth is connected
  if (bleSerial.connected())
  {
    // Send the value
    bleSerial.println(counter);
    // Wait for 0.1 second
    delay(100);
  }
}

void updateCounter()
{
  // compare the current state to previous state
  if (state != previousState && state)
  {
    // if they are differnt, and current state is high, then the wheel has turned:
    counter++;
    Serial.println(counter);
  }
  // save the current state as the last state, for next time through the loop
  previousState = state;
}
