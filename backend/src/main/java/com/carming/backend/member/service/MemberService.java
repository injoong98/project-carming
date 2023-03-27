package com.carming.backend.member.service;

import com.carming.backend.common.JsonMapper;
import com.carming.backend.member.domain.Member;
import com.carming.backend.member.domain.valid.AuthenticationInfo;
import com.carming.backend.member.dto.request.MemberCreateDto;
import com.carming.backend.member.exception.NotAuthentication;
import com.carming.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final RedisTemplate redisTemplate;


    @Transactional
    public Long saveMember(MemberCreateDto request) {
        validAuthenticated(request);
        Member savedMember = memberRepository.save(request.toEntity());
        return savedMember.getId();
    }

    private void validAuthenticated(MemberCreateDto request) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        AuthenticationInfo authenticationInfo = JsonMapper.toClass(operations.get(request.getPhoneNumber()), AuthenticationInfo.class);

        if (!authenticationInfo.getAuthenticated()) {
            throw new NotAuthentication();
        }
    }

}
