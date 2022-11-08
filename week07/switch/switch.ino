// tutoiral from https://makersportal.com/blog/2018/9/21/capacitive-touch-sensor-with-arduino

const int BUTTON = 2;
const int LED = 3;
int BUTTONstate = 0;

void setup()
{
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  // read the input on the analog input (this is useful for 
  // printing the voltage to the serial monitor
  int cap_reading = analogRead(A0);  
  // Convert 10-bit ADC value (0 - 1023) to the actual voltage reading (0 - 5V)
  float volt_reading = (5.0 / 1023.0)*cap_reading;
  Serial.print(volt_reading);
  Serial.println(" Volts");
  // set the value where the LED turns on
  if (volt_reading>3){
    // turn LED on
    digitalWrite(LED,HIGH);
  } else{
    // otherwise, turn LED off
    digitalWrite(LED,LOW);
  }
  delay(10);
}
