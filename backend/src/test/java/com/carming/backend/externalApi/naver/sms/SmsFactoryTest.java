package com.carming.backend.externalApi.naver.sms;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class SmsFactoryTest {

    @Autowired
    SmsFactory factory;

    @Test
    @DisplayName("Value 애노테이션 값이 잘 들어가는지 확인")
    void makeSmsFactory() {
        assertThat(factory.getAccessKey()).isNotNull();
        assertThat(factory.getSecretKey()).isNotNull();
        assertThat(factory.getServiceId()).isNotNull();
        assertThat(factory.getWebClient()).isNull();
    }

}