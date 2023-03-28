package com.carming.backend.member.exception;

import com.carming.backend.exception.CustomException;

public class MemberNotFound extends CustomException {

    private static final String MESSAGE = "해당하는 유저가 없습니다.";

    public MemberNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
