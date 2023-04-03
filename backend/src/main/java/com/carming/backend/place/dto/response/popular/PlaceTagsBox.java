package com.carming.backend.place.dto.response.popular;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PlaceTagsBox {

    private String tagName;

    private Long tagCount;

    public PlaceTagsBox(String tagName, Long tagCount) {
        this.tagName = tagName;
        this.tagCount = tagCount;
    }
}
