package com.carming.backend.member.service;

import com.carming.backend.common.JsonMapper;
import com.carming.backend.member.domain.Member;
import com.carming.backend.member.domain.valid.AuthenticationInfo;
import com.carming.backend.member.dto.request.MemberCreateDto;
import com.carming.backend.member.repository.CardRepository;
import com.carming.backend.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

class MemberServiceTest {

    private final MemberRepository memberRepository = Mockito.mock(MemberRepository.class);

    private final CardRepository cardRepository = Mockito.mock(CardRepository.class);

    private final RedisTemplate redisTemplate = Mockito.mock(RedisTemplate.class);

    private final ValueOperations operations = Mockito.mock(ValueOperations.class);

    private MemberService memberService;

    @BeforeEach
    void setUp() {
        BDDMockito.given(redisTemplate.opsForValue()).willReturn(operations);
        memberService = new MemberService(memberRepository, cardRepository, redisTemplate);
    }

    @Transactional
    @Test
    @DisplayName("회원가입")
    void signup() {
//        //given
//        final String PHONE_NUMBER = "01051391314";
//        MemberCreateDto request = createMemberDto(PHONE_NUMBER);
//        Member entity = request.toEntity();
//        String authInfo = JsonMapper.toJson(new AuthenticationInfo(PHONE_NUMBER, true));
//
//        BDDMockito.given(operations.get(eq(PHONE_NUMBER))).willReturn(authInfo);
//        BDDMockito.given(memberRepository.save(any(Member.class))).willReturn(createId(entity, 1L));
//
//        //when
//        Long savedMemberId = memberService.saveMember(request);
//
//        //then
//        assertThat(savedMemberId).isEqualTo(1L);
//        BDDMockito.then(operations).should(Mockito.times(1)).get(PHONE_NUMBER);
//        BDDMockito.then(memberRepository).should(Mockito.times(1)).save(any(Member.class));
    }

    private Member createId(Member member, Long gnerateId) {
        ReflectionTestUtils.setField(member, "id", gnerateId);
        return member;
    }
    private MemberCreateDto createMemberDto(String phoneNumber) {
        return MemberCreateDto.builder()
                .phone(phoneNumber)
                .password("1234")
                .passwordConfirm("1234")
                .nickname("광")
                .name("이신광")
                .birthInfo(new MemberCreateDto.BirthInfoDto("1993", "02", "06"))
                .cardDto(new MemberCreateDto.CardDto("1", "2", "3", "4", "5"))
                .build();
    }
}