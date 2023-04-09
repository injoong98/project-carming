package com.carming.backend.member.exception;

import com.carming.backend.exception.CustomException;

public class MemberAlreadySigned extends CustomException {

    private static final String MESSAGE = "이미 등록된 회원입니다.";

    public MemberAlreadySigned() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 409;
    }
}
