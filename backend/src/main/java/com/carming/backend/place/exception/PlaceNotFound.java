package com.carming.backend.place.exception;

import com.carming.backend.exception.CustomException;

public class PlaceNotFound extends CustomException {

    private static final String MESSAGE = "해당하는 장소가 없습니다.";

    public PlaceNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
