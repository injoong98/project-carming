package com.carming.backend.place.dto.response.popular;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class PopularPlaceDetailDto {

    private Long id;

    private String name;

    private  String tel;

    private String image;

    private String region;

    private String address;

    private Integer ratingSum;

    private Integer ratingCount;

    private List<PlaceTagsBox> tags;

    public void changePlaceTagsBox(List<PlaceTagsBox> tags) {
        this.tags = tags;
    }

}
