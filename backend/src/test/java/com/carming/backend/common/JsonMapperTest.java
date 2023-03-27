package com.carming.backend.common;

import com.carming.backend.member.domain.valid.AuthenticationInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class JsonMapperTest {

    @Test
    @DisplayName("JSON 변환 확인")
    void convertToJSON() {
        final String PHONE_NUMBER = "01051391314";
        String authInfo = JsonMapper.toJson(new AuthenticationInfo(PHONE_NUMBER, true));
        AuthenticationInfo information = JsonMapper.toClass(authInfo, AuthenticationInfo.class);

        System.out.println(authInfo);
        System.out.println(information);
    }
}