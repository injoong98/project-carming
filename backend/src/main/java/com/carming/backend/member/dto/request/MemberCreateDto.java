package com.carming.backend.member.dto.request;

import com.carming.backend.member.domain.Member;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Data
public class MemberCreateDto {

    @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$",
            message = "휴대폰번호가 올바르지 않습니다. 다시 입력해주세요.")
    private String phoneNumber;

    private String password;

    private String passwordCheck;

    private String nickname;

    private String name;

    private BirthInfoDto birthInfo;

    @Builder
    public MemberCreateDto(String phoneNumber, String password, String passwordCheck,
                           String nickname, String name, BirthInfoDto birthInfo) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordCheck = passwordCheck;
        this.nickname = nickname;
        this.name = name;
        this.birthInfo = birthInfo;
    }

    public Member toEntity() {
        return Member.builder()
                .phoneNumber(phoneNumber)
                .password(password)
                .nickname(nickname)
                .name(name)
                .birthday(birthInfo.toLocalDate())
                .build();
    }

    @Data
    public static class BirthInfoDto {

        @Pattern(regexp = "^(19[0-9][0-9]|20\\d{2})", message = "유효하지 않은 출생년도입니다.")
        private String year;

        @Pattern(regexp = "(0[1-9]|1[0-2])", message = "유효하지 않은 월입니다.")
        private String month;

        @Pattern(regexp = "0[1-9]|[1-2][0-9]|3[0-1]", message = "유효하지 않는 일입니다.")
        private String day;

        public BirthInfoDto(String year, String month, String day) {
            this.year = year;
            this.month = month;
            this.day = day;
        }

        public LocalDate toLocalDate() {
            return LocalDate.of(Integer.valueOf(year), Integer.valueOf(month), Integer.valueOf(day));
        }
    }
}
