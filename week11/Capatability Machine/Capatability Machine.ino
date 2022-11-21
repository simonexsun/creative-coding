// LCD tutorial from Arduino example
// RGB LED tutorial from Arduino, https://create.arduino.cc/projecthub/muhammad-aqib/arduino-rgb-led-tutorial-fc003e
// buzzer tutorial from Arduino, https://create.arduino.cc/projecthub/SURYATEJA/use-a-buzzer-module-piezo-speaker-using-arduino-uno-89df45

/* LCD circuit:
 * LCD RS pin to digital pin 8
 * LCD Enable (E) pin to digital pin 9
 * LCD D4 pin to digital pin 4
 * LCD D5 pin to digital pin 5
 * LCD D6 pin to digital pin 6
 * LCD D7 pin to digital pin 7
 * LCD R/W pin to ground
 * LCD VSS pin to ground
 * LCD VCC pin to 5V
 * 10K resistor:
 * ends to +5V and ground
 * wiper to LCD VO pin (pin 3)
*/

#include <LiquidCrystal.h>
int analogInput_1 = 0;
int analogInput_2 = 0;
int pMappedInput;
bool isUser_1 = true;

const int buttonPin = 3;
int buttonState = 0; 

int buzzerPin = 2;                    //Buzzer used for sound feedback
LiquidCrystal lcd(8, 9, 4, 5, 6, 7);  //Assign LCD screen pins, as per LCD shield requirements

int displayValue;
String user;

int redPin= 10;
int greenPin = 11;
int bluePin = 12;

void setup() {
  Serial.begin(9600);

  pinMode(buzzerPin, OUTPUT);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  lcd.begin(16, 2);  // columns, rows.  use 16,2 for a 16x2 LCD, etc.
  lcd.clear();
  lcd.setCursor(0, 0);  //Display some text on LCD then clear it
  lcd.print("Compatability");
  lcd.setCursor(0, 1);
  lcd.print("Machine");
  delay(3000);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Input your");
  lcd.setCursor(0, 1);
  lcd.print("birth of months");
  delay(3000);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  // If the pushbutton is pressed (HIGH), switch to another user
  if (buttonState == HIGH) {
    // turn LED on:
    isUser_1 = !isUser_1;
  }
  int mappedInput = map(analogRead(A0), 0, 1023, 1, 12);

  // update the input values only when mappedInput changes
  if(mappedInput != pMappedInput){
    if(isUser_1){      
      analogInput_1 = mappedInput;
      user = "User 1: ";   
    }else{
      analogInput_2 = mappedInput;
      user = "User 2: ";
    }
    pMappedInput = mappedInput; // update previous mappedInput
  }

  // update user info
  if(isUser_1){
    user = "User 1: ";   
    displayValue = analogInput_1;
  }else{
    user = "User 2: ";     
    displayValue = analogInput_2;
  }

  // debugging
  Serial.print("current: " + user + "; ");
  Serial.print(analogInput_1);
  Serial.print(", ");
  Serial.println(analogInput_2);

  // LCD visual feedback
  lcd.setCursor(0, 0);  // line 1
  lcd.print(user);
  lcd.print(displayValue);  // Display analog input
  lcd.setCursor(0, 1);  // line 2
  lcd.print("(Button=confirm)");

  delay(500);      // delay for stability
  lcd.clear();      // Clear the display

  RGB_light(255, 0, 0); // Red
}

void RGB_light(int r, int g, int b){
  analogWrite(redPin, r);
  analogWrite(greenPin, g);  
  analogWrite(bluePin, b);
}