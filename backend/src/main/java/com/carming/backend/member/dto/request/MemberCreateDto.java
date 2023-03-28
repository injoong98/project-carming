package com.carming.backend.member.dto.request;

import com.carming.backend.login.authentication.PasswordEncoder;
import com.carming.backend.member.domain.Card;
import com.carming.backend.member.domain.Gender;
import com.carming.backend.member.domain.Member;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@NoArgsConstructor
@Data
public class MemberCreateDto {

    @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$",
            message = "휴대폰번호가 올바르지 않습니다. 다시 입력해주세요.")
    private String phone;

    private String password;

    private String passwordConfirm;

    private String nickname;

    private String name;

    private Gender gender;

    private BirthInfoDto birthInfo;

    private CardDto card;

    @Builder
    public MemberCreateDto(String phone, String password, String passwordConfirm,
                           String nickname, String name, Gender gender,
                           BirthInfoDto birthInfo, CardDto cardDto) {
        this.phone = phone;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.nickname = nickname;
        this.name = name;
        this.gender = gender;
        this.birthInfo = birthInfo;
        this.card = cardDto;
    }

    public Member toEntity() {
        return Member.builder()
                .phoneNumber(phone)
                .password(PasswordEncoder.encode(password))
                .nickname(nickname)
                .name(name)
                //Todo change image
                .profile("example.com")
                .gender(gender)
                .birthday(birthInfo.toLocalDate())
                .build();
    }

    @NoArgsConstructor
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

    @NoArgsConstructor
    @Data
    public static class CardDto {

        private String cardNumber;

        private String cvv;

        private String cardExp;

        private String cardPassword;

        private String companyName;

        @Builder
        public CardDto(String cardNumber, String cvv, String cardExp, String cardPassword, String companyName) {
            this.cardNumber = cardNumber;
            this.cvv = cvv;
            this.cardExp = cardExp;
            this.cardPassword = cardPassword;
            this.companyName = companyName;
        }

        public Card toEntity() {
            return Card.builder()
                    .number(cardNumber)
                    .cvv(cvv)
                    .expiredDate(cardExp)
                    .password(cardPassword)
                    .companyName(companyName)
                    .build();
        }
    }
}
