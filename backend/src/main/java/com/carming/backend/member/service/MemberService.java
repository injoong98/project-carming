package com.carming.backend.member.service;

import com.carming.backend.common.JsonMapper;
import com.carming.backend.member.domain.Card;
import com.carming.backend.member.domain.Member;
import com.carming.backend.member.domain.valid.AuthenticationInfo;
import com.carming.backend.member.dto.request.MemberCreateDto;
import com.carming.backend.member.exception.NotAuthentication;
import com.carming.backend.member.repository.CardRepository;
import com.carming.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final CardRepository cardRepository;

    private final StringRedisTemplate redisTemplate;


    @Transactional
    public Long saveMember(MemberCreateDto request) {
        Card card = request.getCard().toEntity();
        cardRepository.save(card);

        Member member = request.toEntity();
        member.changeCard(card);

        Member savedMember = memberRepository.save(member);
        return savedMember.getId();
    }

    public void validAuthenticated(MemberCreateDto request) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        log.info(">>>>>>>>>>>> request.getPhone = {}", request.getPhone());
        String json = operations.get(request.getPhone());
        log.info(">>>>>>> json = {}", json);
        AuthenticationInfo authenticationInfo = JsonMapper.toClass(json, AuthenticationInfo.class);

        if (!authenticationInfo.getAuthenticated()) {
            throw new NotAuthentication();
        }
    }

}
