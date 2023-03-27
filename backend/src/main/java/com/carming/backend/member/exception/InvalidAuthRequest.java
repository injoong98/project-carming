package com.carming.backend.member.exception;

import com.carming.backend.exception.CustomException;

public class InvalidAuthRequest extends CustomException {

    private static final String MESSAGE = "유효하지 않은 인증번호입니다.";

    public InvalidAuthRequest() {
        super(MESSAGE);
    }

    public InvalidAuthRequest(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidAuthRequest(String fieldName, String errorMessage) {
        super(MESSAGE);
        addValidation(fieldName, errorMessage);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
