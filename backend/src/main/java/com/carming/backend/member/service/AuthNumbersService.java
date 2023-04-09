package com.carming.backend.member.service;

import com.carming.backend.common.JsonMapper;
import com.carming.backend.member.domain.valid.AuthNumberFactory;
import com.carming.backend.member.domain.valid.AuthenticationInfo;
import com.carming.backend.member.dto.request.AuthNumbersDto;
import com.carming.backend.member.dto.request.PhoneNumberDto;
import com.carming.backend.member.exception.InvalidAuthRequest;
import com.carming.backend.member.exception.MemberAlreadySigned;
import com.carming.backend.member.repository.MemberRepository;
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

    private final MemberRepository memberRepository;

    @Transactional
    public String saveAuthNumbers(PhoneNumberDto request) {
        String phoneNumber = request.getPhone();
        if (memberRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new MemberAlreadySigned();
        }

        String authNumbers = AuthNumberFactory.createValidNumbers().getAuthNumbers();
        String authenticationInfo = JsonMapper.toJson(new AuthenticationInfo(authNumbers, false));

        if (!StringUtils.hasText(authenticationInfo)) {
            throw new InvalidAuthRequest();
        }
        saveAuthenticationInfo(phoneNumber, authenticationInfo, 3L);
        return authNumbers;
    }


    public String validAuthNumbers(AuthNumbersDto request) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        String json = operations.get(request.getPhone()); //잘못 입력할 수도 있으니, getAndDelete 가 아닌 get
        AuthenticationInfo authentication = JsonMapper.toClass(json, AuthenticationInfo.class);

        String requestAuthNumbers = request.getAuthNumber();

        if (isNotSame(authentication.getAuthNumbers(), requestAuthNumbers)) {
            throw new InvalidAuthRequest();
        }

        String passAuthentication = JsonMapper.toJson(new AuthenticationInfo(requestAuthNumbers, true));
        saveAuthenticationInfo(request.getPhone(), passAuthentication, 60L);
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
