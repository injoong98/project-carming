package com.carming.backend.externalApi.naver.sms;

import com.carming.backend.member.domain.valid.AuthNumberFactory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class SmsTest {

    @Test
    @DisplayName("sms 생성시 포맷에 맞게 생성되는지 확인")
    void makeSms() {
        //given
        String content = AuthNumberFactory.createValidNumbers().getAuthNumbers();
        final String TO = "01051391314";
        final String APP_TITLE = "Carming";
        Sms sms = new Sms(TO, content);

        assertThat(sms.getType()).isEqualTo("SMS");
        assertThat(sms.getContentType()).isEqualTo("COMM");
        assertThat(sms.getCountryCode()).isEqualTo("82");
        assertThat(sms.getFrom()).isEqualTo("01051391314");
        assertThat(sms.getContent().contains(APP_TITLE)).isTrue();
        assertThat(sms.getMessages().get(0).getTo()).isEqualTo(TO);
    }

}