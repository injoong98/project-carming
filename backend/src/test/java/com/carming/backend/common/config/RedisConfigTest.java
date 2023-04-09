package com.carming.backend.common.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RedisConfigTest {

    @Autowired
    RedisConfig redisConfig;

    @Test
    @DisplayName("레디스 설정클래스에 value 값이 잘 들어가는 지 확인")
    void injectOfValue() {
        System.out.println(redisConfig.getRedisHost());
        System.out.println(redisConfig.getRedisPort());
        System.out.println(redisConfig.getRedisPassword());
    }

}