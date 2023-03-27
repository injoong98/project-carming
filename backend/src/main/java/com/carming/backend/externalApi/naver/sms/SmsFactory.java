package com.carming.backend.externalApi.naver.sms;

import lombok.Data;
import lombok.Getter;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@PropertySource("classpath:naver-sms.properties")
@Getter
@Data
@Component
public class SmsFactory {

    @Value("${key.service}")
    private String serviceId;

    @Value("${key.access}")
    private String accessKey;

    @Value("${key.secret}")
    private String secretKey;

    private WebClient webClient;

    public SmsResponse send(String to, String validNumber) {
        if (webClient == null) {
            createWebClient();
        }

        return webClient.post()
                .uri("/services/" + serviceId +
                        "/messages")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(new Sms(to, validNumber))
                .retrieve()
                .bodyToMono(SmsResponse.class)
                .block();
    }

    private void createWebClient() {
        this.webClient = WebClient.builder()
                .baseUrl(NaverSmsConst.BASE_URL)
                .defaultHeaders(this::addDefaultHeaders)
                .build();
    }

    private void addDefaultHeaders(final HttpHeaders httpHeaders) {
        String time = Long.toString(System.currentTimeMillis());

        httpHeaders.add(NaverSmsConst.CONTENT_TYPE_HEADER, NaverSmsConst.CONTENT_TYPE_VALUE);
        httpHeaders.add(NaverSmsConst.TIME_STAMP_HEADER, time);
        httpHeaders.add(NaverSmsConst.ACCESS_KEY_HEADER, accessKey);

        try {
            httpHeaders.add(NaverSmsConst.ACCESS_SIGNATURE, makeSignature(time));
        } catch (UnsupportedEncodingException | NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
        }
    }

    private String makeSignature(String time) throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + serviceId + "/messages";

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(time)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

}
