package com.carming.backend.login.dto.response;

import com.carming.backend.login.authentication.JwtConst;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class LoginResponseDto {

    private String headerName;

    private String tokenType; // "Bearer "

    private String accessToken; // jwt

    private String nickname;

    private String profile;

    public LoginResponseDto(String tokenType, String accessToken,
                            String nickname, String profile) {
        this.headerName = JwtConst.HEADER_STRING;
        this.tokenType = tokenType;
        this.accessToken = accessToken;
        this.nickname = nickname;
        this.profile = profile;
    }
}
