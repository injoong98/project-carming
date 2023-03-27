package com.carming.backend.login.authentication;

import com.sun.security.auth.UserPrincipal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

    @Value()
    private String jwtSecret;

    @Value()
    private int jwtExpirationTime;

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

//        Jwt
    }
}
