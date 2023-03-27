package com.carming.backend.login.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class LoginRequestDto {

    private String phoneNumber;

    private String password;

}
