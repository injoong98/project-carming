package com.carming.backend.member.dto.request;

import lombok.Data;

import javax.validation.constraints.Pattern;

@Data
public class PhoneNumberDto {

    @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$",
            message = "휴대폰번호가 올바르지 않습니다. 다시 입력해주세요.")
    private String phone;

}
