package com.carming.backend;

import com.carming.backend.member.domain.Gender;
import com.carming.backend.member.dto.request.MemberCreateDto;
import com.carming.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@RequiredArgsConstructor
@Component
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.init();
    }

    @RequiredArgsConstructor
    @Component
    @Transactional
    static class InitService {

        private final MemberService memberService;

        public void init() {
            saveMember();
        }

        private void saveMember() {
            memberService.saveMember(createMemberRequest("01011111111", "123456", "ADMIN", "ADMIN"));
            memberService.saveMember(createMemberRequest("01022222222", "123456", "ADMIN_M", "ADMIN_M"));
        }

        private MemberCreateDto createMemberRequest(String phone, String password,
                                                    String nickname, String name) {
            return MemberCreateDto.builder()
                    .phone(phone)
                    .password(password)
                    .passwordConfirm(password)
                    .nickname(nickname)
                    .name(name)
                    .gender(Gender.MALE)
                    .birthDate("1995/05/15")
                    .cardDto(new MemberCreateDto.CardDto("1", "2", "3", "4", "5"))
                    .build();
        }
    }
}
