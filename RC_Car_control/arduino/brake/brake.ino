#include <Adafruit_NeoPixel.h>

#define LED_PIN_LEFT 3
#define LED_PIN_RIGHT 2
#define LED_COUNT 1

Adafruit_NeoPixel pixel_left(LED_COUNT, LED_PIN_LEFT, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel pixel_right(LED_COUNT, LED_PIN_RIGHT, NEO_GRB + NEO_KHZ800);

void setup() {
  pixel_left.begin();
  pixel_right.begin();

  pixel_left.setPixelColor(0, pixel_left.Color(255, 0, 0)); // LED를 노란색으로 설정
  pixel_right.setPixelColor(0, pixel_right.Color(255, 0, 0));
  pixel_left.show(); // 변경된 색을 표시
  pixel_right.show();  
}

void loop() {
  
}
