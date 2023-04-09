package com.carming.backend.tag.domain;

public enum Category {

    CAFE("카페"),
    FOOD("음식점"),
    PLAY("놀거리"),
    ATTRACTION("명소"),
    SLEEP("숙박"),
    COURSE("코스");

    private String value;

    Category(String value) {
        this.value = value;
    }
}
