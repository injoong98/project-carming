package com.carming.backend.member.service;

import com.carming.backend.common.JsonMapper;
import com.carming.backend.member.domain.valid.AuthNumberFactory;
import com.carming.backend.member.domain.valid.AuthenticationInfo;
import com.carming.backend.member.dto.request.AuthNumbersDto;
import com.carming.backend.member.dto.request.PhoneNumberDto;
import com.carming.backend.member.exception.InvalidAuthRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.Duration;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthNumbersService {

    private final StringRedisTemplate redisTemplate;

    @Transactional
    public String saveAuthNumbers(PhoneNumberDto request) {
        String phoneNumber = request.getPhoneNumber();
        String authNumbers = AuthNumberFactory.createValidNumbers().getAuthNumbers();
        String authenticationInfo = JsonMapper.toJson(new AuthenticationInfo(authNumbers, false));

        if (!StringUtils.hasText(authenticationInfo)) {
            throw new InvalidAuthRequest();
        }
        saveAuthenticationInfo(phoneNumber, authenticationInfo, 30000L);
        return authNumbers;
    }


    public String validAuthNumbers(AuthNumbersDto request) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        String json = operations.get(request.getPhoneNumber());
        AuthenticationInfo authentication = JsonMapper.toClass(json, AuthenticationInfo.class);

        String requestAuthNumbers = request.getAuthNumber();

        if (isNotSame(authentication.getAuthNumbers(), requestAuthNumbers)) {
            throw new InvalidAuthRequest();
        }

        String passAuthentication = JsonMapper.toJson(new AuthenticationInfo(requestAuthNumbers, true));
        saveAuthenticationInfo(request.getPhoneNumber(), passAuthentication, 60L);
        return requestAuthNumbers;
    }

    private boolean isNotSame(String originAuthNumber, String requestAuthNumber) {
        if (!requestAuthNumber.equals(originAuthNumber)) {
            return true;
        }
        return false;
    }

    private void saveAuthenticationInfo(String phoneNumber, String authenticationInfo, Long minutes) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(phoneNumber, authenticationInfo, Duration.ofMinutes(minutes));
    }
}
