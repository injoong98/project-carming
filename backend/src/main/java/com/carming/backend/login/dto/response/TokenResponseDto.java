package com.carming.backend.login.dto.response;

import com.carming.backend.login.authentication.JwtConst;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TokenResponseDto {

    private String headerName;

    private String tokenType; // "Bearer "

    private String accessToken; // jwt

    public TokenResponseDto(String tokenType, String accessToken) {
        this.headerName = JwtConst.HEADER_STRING;
        this.tokenType = tokenType;
        this.accessToken = accessToken;
    }
}
