package com.carming.backend.course.exception;

import com.carming.backend.exception.CustomException;

public class CourseNotFound extends CustomException {

    private final static String MESSAGE = "해당하는 코스가 없습니다.";

    public CourseNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
