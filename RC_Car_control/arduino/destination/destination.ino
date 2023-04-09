#include <Adafruit_NeoPixel.h>

#define LED_PIN_LEFT 3
#define LED_PIN_RIGHT 2
#define LED_COUNT 1

Adafruit_NeoPixel pixel_left(LED_COUNT, LED_PIN_LEFT, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel pixel_right(LED_COUNT, LED_PIN_RIGHT, NEO_GRB + NEO_KHZ800);

void setup() {
  pixel_left.begin();
  pixel_right.begin();
}

void loop() {
  pixel_left.setPixelColor(0, pixel_left.Color(255, 0, 0)); // LED를 빨간색으로 설정
  pixel_right.setPixelColor(0, pixel_right.Color(255, 0, 0)); // LED를 빨간색으로 설정
  pixel_left.show(); // 변경된 색을 표시
  pixel_right.show();
  delay(500); // 0.5초 대기

  pixel_left.setPixelColor(0, pixel_left.Color(0, 0, 0)); // LED를 끔
  pixel_right.setPixelColor(0, pixel_right.Color(0, 0, 0));  
  pixel_left.show(); // 변경된 색을 표시
  pixel_right.show();
  delay(500); // 0.5초 대기
}
