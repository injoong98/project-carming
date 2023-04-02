package com.carming.backend.place.dto.response;

import lombok.Data;

@Data
public class PlaceTagsBox {

    private String tagName;

    private Long tagCount;

    public PlaceTagsBox(String tagName, Long tagCount) {
        this.tagName = tagName;
        this.tagCount = tagCount;
    }
}
