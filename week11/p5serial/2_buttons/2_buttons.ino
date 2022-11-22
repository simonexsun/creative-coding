const int buttonPin_1 = 3; 
const int buttonPin_2 = 2; 

void setup() {
  Serial.begin(9600);
}

void loop() {
  int buttonState_1 = digitalRead(buttonPin_1);
  int buttonState_2 = digitalRead(buttonPin_2);

  Serial.print(buttonState_1);
  Serial.println(buttonState_2);

  // slight delay to stabilize the ADC:
  delay(100);          
}


