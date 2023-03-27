package com.carming.backend.login.service;

import com.carming.backend.login.authentication.JwtConst;
import com.carming.backend.login.authentication.JwtProvider;
import com.carming.backend.login.authentication.PasswordEncoder;
import com.carming.backend.login.dto.request.LoginRequestDto;
import com.carming.backend.login.dto.response.TokenResponseDto;
import com.carming.backend.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class LoginService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public TokenResponseDto login(LoginRequestDto request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getPhoneNumber(), request.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        String accessToken = JwtProvider.generateToken(authentication);
        return new TokenResponseDto(JwtConst.TOKEN_TYPE, accessToken);
    }
}
