#include <Adafruit_NeoPixel.h>

#define LED_PIN_LEFT 3
#define LED_PIN_RIGHT 2
#define LED_COUNT 1

int num = 0;
Adafruit_NeoPixel pixel_left(LED_COUNT, LED_PIN_LEFT, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel pixel_right(LED_COUNT, LED_PIN_RIGHT, NEO_GRB + NEO_KHZ800);

void setup() {
  Serial.begin(9600); // 시리얼 통신 시작
  pixel_right.begin();
}

void loop() {
  if (Serial.available()) { // 시리얼 버퍼에 데이터가 있는 경우
    num = Serial.read(); // 데이터를 읽고 변수에 저장
    Serial.print("Received number: ");
    Serial.println(num);

    if (num == 1) { // 1 = 정상주행 = 불꺼짐
      pixel_left.begin();
      //pixel_left.end();
      pixel_right.begin();
      pixel_left.setPixelColor(0, pixel_left.Color(0, 0, 0)); // LED를 끔
      pixel_right.setPixelColor(0, pixel_right.Color(0, 0, 0));  
      pixel_left.show();
      pixel_right.show();
    }

    else if (num == 2) { // 2 = 좌회전
      pixel_left.begin();
      pixel_left.setPixelColor(0, pixel_left.Color(255, 255, 0));
      pixel_left.show();
      delay(500);
    }
    
    else if (num == 3) { // 3 = 우회전
      pixel_right.begin();
      pixel_right.setPixelColor(0, pixel_right.Color(255, 255, 0));
      pixel_right.show();
      delay(500);
    }
  }
}