package com.carming.backend.member.controller;

import com.carming.backend.common.JsonMapper;
import com.carming.backend.member.domain.Gender;
import com.carming.backend.member.domain.valid.AuthNumberFactory;
import com.carming.backend.member.domain.valid.AuthNumbers;
import com.carming.backend.member.domain.valid.AuthenticationInfo;
import com.carming.backend.member.dto.request.MemberCreateDto;
import com.carming.backend.member.exception.NotAuthentication;
import com.carming.backend.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@SpringBootTest
class MemberControllerTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    MemberController memberController;

    @Test
    @Transactional
    @DisplayName("회원가입 - 인증번호 성공 시")
    void signup() {
        //given
        final Boolean AUTHENTICATED = true;
        String PHONE = "01051391314";
        AuthNumbers numbers = AuthNumberFactory.createValidNumbers();

        redisTemplate.opsForValue().set(PHONE, JsonMapper.toJson(new AuthenticationInfo(numbers.getAuthNumbers(), AUTHENTICATED)), Duration.ofMinutes(3L));
        MemberCreateDto request = new MemberCreateDto(PHONE, "1234", "1234", "하이", "이신광", Gender.MALE, new MemberCreateDto.BirthInfoDto("1993", "02", "06"), null);

        //when
        memberController.signupMember(request);

        //then
        Assertions.assertThat(memberRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    @Transactional
    @DisplayName("회원가입 - 인증번호 실패")
    void fail_signUp() {
        //given
        final Boolean AUTHENTICATED = false;
        String PHONE = "01051391314";
        AuthNumbers numbers = AuthNumberFactory.createValidNumbers();

        redisTemplate.opsForValue().set(PHONE, JsonMapper.toJson(new AuthenticationInfo(numbers.getAuthNumbers(), AUTHENTICATED)), Duration.ofMinutes(3L));
        MemberCreateDto request = new MemberCreateDto(PHONE, "1234", "1234", "하이", "이신광", Gender.MALE, new MemberCreateDto.BirthInfoDto("1993", "02", "06"), null);

        //expected
        Assertions.assertThatThrownBy(() -> memberController.signupMember(request))
                .isInstanceOf(NotAuthentication.class);
    }

}