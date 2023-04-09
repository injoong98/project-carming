package com.carming.backend.exception;

public class InvalidRequest extends CustomException {

    private static final String MESSAGE = "잘못된 요청입니다.";

    public InvalidRequest() {
        super(MESSAGE);
    }

    public InvalidRequest(String field, String errorMessage) {
        super(MESSAGE);
        addValidation(field, errorMessage);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
