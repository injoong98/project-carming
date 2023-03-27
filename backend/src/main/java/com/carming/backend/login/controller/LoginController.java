package com.carming.backend.login.controller;

import com.carming.backend.login.dto.request.LoginRequestDto;
import com.carming.backend.login.dto.response.TokenResponseDto;
import com.carming.backend.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@RequestBody LoginRequestDto request) {
        TokenResponseDto response = loginService.login(request);

        return ResponseEntity.ok(response);
    }
}
