package com.carming.backend.common;

import com.carming.backend.exception.CustomException;

public class FailConvertJson extends CustomException {

    private final String MESSAGE = "JSON 파싱에 실패했습니다.";

    public FailConvertJson() {
        super();
    }

    public FailConvertJson(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public int getStatusCode() {
        return 500;
    }
}
