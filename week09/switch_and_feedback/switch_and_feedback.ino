// light sensor tutorial from https://arduinogetstarted.com/tutorials/arduino-light-sensor

// LED pin 2~9
const int LED_1 = 2;
const int LED_2 = 3;
const int LED_3 = 4;
const int LED_4 = 5;
const int LED_5 = 6;
const int LED_6 = 7;

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);

  pinMode(LED_1, OUTPUT);
  pinMode(LED_2, OUTPUT);
  pinMode(LED_3, OUTPUT);
  pinMode(LED_4, OUTPUT);
  pinMode(LED_5, OUTPUT);
  pinMode(LED_6, OUTPUT);
}

void loop() {
  // reads the input on analog pin A0 (value 0-1023, actually reading 0-20) and map to 0-1000
  int analogValue = analogRead(A0);
  float mappedValue = (1000.0 / 25.0 ) * analogValue;

  Serial.print("Analog reading: ");
  Serial.println(mappedValue);   // the raw analog reading

  // set threshholds for different events
  if (mappedValue < 150) {
    // turn on all LEDs
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, HIGH);
    digitalWrite(LED_3, HIGH);
    digitalWrite(LED_4, HIGH);
    digitalWrite(LED_5, HIGH);
    digitalWrite(LED_6, HIGH);
  } else if (mappedValue < 250) {
    // turn on 5 LEDs
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, HIGH);
    digitalWrite(LED_3, HIGH);
    digitalWrite(LED_4, HIGH);
    digitalWrite(LED_5, HIGH);
    digitalWrite(LED_6, LOW);
  } else if (mappedValue < 350) {
    // turn on 4 LEDs
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, HIGH);
    digitalWrite(LED_3, HIGH);
    digitalWrite(LED_4, HIGH);
    digitalWrite(LED_5, LOW);
    digitalWrite(LED_6, LOW);
  } else if (mappedValue < 450) {
    // turn on 3 LEDs
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, HIGH);
    digitalWrite(LED_3, HIGH);
    digitalWrite(LED_4, LOW);
    digitalWrite(LED_5, LOW);
    digitalWrite(LED_6, LOW);
  } else if (mappedValue < 550) {
    // turn on 2 LEDs
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, HIGH);
    digitalWrite(LED_3, LOW);
    digitalWrite(LED_4, LOW);
    digitalWrite(LED_5, LOW);
    digitalWrite(LED_6, LOW);
  } else if (mappedValue < 650) {
    // turn on 1 LEDs
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, LOW);
    digitalWrite(LED_3, LOW);
    digitalWrite(LED_4, LOW);
    digitalWrite(LED_5, LOW);
    digitalWrite(LED_6, LOW);
  } else {
    // turn on 0 LEDs
    digitalWrite(LED_1, LOW);
    digitalWrite(LED_2, LOW);
    digitalWrite(LED_3, LOW);
    digitalWrite(LED_4, LOW);
    digitalWrite(LED_5, LOW);
    digitalWrite(LED_6, LOW);
  }
  delay(500);
}
