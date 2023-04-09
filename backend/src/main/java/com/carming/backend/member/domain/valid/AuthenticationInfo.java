package com.carming.backend.member.domain.valid;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AuthenticationInfo {

    String authNumbers;

    Boolean authenticated;

    public AuthenticationInfo(String authNumbers, Boolean Authenticated) {
        this.authNumbers = authNumbers;
        this.authenticated = Authenticated;
    }
}
