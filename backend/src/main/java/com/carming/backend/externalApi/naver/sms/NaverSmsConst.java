package com.carming.backend.externalApi.naver.sms;

public interface NaverSmsConst {

    String BASE_URL = "https://sens.apigw.ntruss.com/sms/v2";

    String CONTENT_TYPE_HEADER = "Content-Type";
    String CONTENT_TYPE_VALUE = "application-json";

    String TIME_STAMP_HEADER = "x-ncp-apigw-timestamp";

    String ACCESS_KEY_HEADER = "x-ncp-iam-access-key";

    String ACCESS_SIGNATURE = "x-ncp-apigw-signature-v2";
}
