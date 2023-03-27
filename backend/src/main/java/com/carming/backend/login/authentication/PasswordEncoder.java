package com.carming.backend.login.authentication;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoder {

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static boolean matches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public static String encode(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
