package com.carming.backend.externalApi.naver.sms;

import lombok.Data;

@Data
public class SmsResponse {

    private String requestId;
    private String requestTime;
    private String statusCode;
    private String statusName;
}
