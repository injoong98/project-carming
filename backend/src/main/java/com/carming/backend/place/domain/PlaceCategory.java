package com.carming.backend.place.domain;

public enum PlaceCategory {

    CAFE("카페"),
    FOOD("음식점"),
    PLAY("놀거리"),
    ATTRACTION("명소"),
    SLEEP("숙박");

    private String value;

    PlaceCategory(String value) {
        this.value = value;
    }
}
