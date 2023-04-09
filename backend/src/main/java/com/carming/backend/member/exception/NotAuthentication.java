package com.carming.backend.member.exception;

import com.carming.backend.exception.CustomException;

public class NotAuthentication extends CustomException {

    private static final String MESSAGE = "인증이 완료되지 않았습니다. 다시 인증해주세요.";

    public NotAuthentication() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 403;
    }
}
