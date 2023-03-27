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

    private final ObjectMapper objectMapper;

    @Transactional
    public String saveAuthNumbers(PhoneNumberDto request) {
        String phoneNumber = request.getPhoneNumber();
        String authNumbers = AuthNumberFactory.createValidNumbers().getAuthNumbers();
        String authenticationInfo = JsonMapper.toJson(new AuthenticationInfo(authNumbers, false));

        if (!StringUtils.hasText(authenticationInfo)) {
            throw new InvalidAuthRequest();
        }
        saveAuthenticationInfo(phoneNumber, authenticationInfo, 3L);
        return authNumbers;
    }


    @Transactional
    public String validAuthNumbers(AuthNumbersDto request) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        String foundAuthNumbers = operations.get(request.getPhoneNumber());
        String requestAuthNumbers = request.getAuthNumber();
        if (isNotSame(foundAuthNumbers, requestAuthNumbers)) {
            throw new InvalidAuthRequest();
        }

        String authenticationInfo = convertObjectToJson(new AuthenticationInfo(requestAuthNumbers, true));
        if (!StringUtils.hasText(authenticationInfo)) {
            throw new InvalidAuthRequest();
        }
        saveAuthenticationInfo(request.getPhoneNumber(), requestAuthNumbers, 60L);
        return requestAuthNumbers;
    }

    private boolean isNotSame(String originAuthNumber, String requestAuthNumber) {
        if (!requestAuthNumber.equals(originAuthNumber)) {
            return true;
        }
        return false;
    }

    private String convertObjectToJson(AuthenticationInfo authenticationInfo) {
        try {
            return objectMapper.writeValueAsString(authenticationInfo);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private void saveAuthenticationInfo(String phoneNumber, String authenticationInfo, Long minutes) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(phoneNumber, authenticationInfo, Duration.ofMinutes(minutes));
    }
}
