package com.carming.backend.externalApi.naver.sms;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;

import java.util.List;

@PropertySource("classpath:naver-sms.properties")
@Data
public class Sms {

    private String type = "SMS";
    private String contentType = "COMM";
    private String countryCode = "82";
    private String from = "01051391314";
    private String content;
    private List<Message> messages;

    public Sms(String to, String content) {
        this.content = formatContent(content);
        this.messages = List.of(new Message(to));
    }

    private String formatContent(String content) {
        return "[Carming] 인증번호: " + content + "\n" +
                "인증번호를 입력해주세요.";
    }


    @Data
    public static class Message {
        private String to;

        public Message(String to) {
            this.to = to;
        }
    }
}
