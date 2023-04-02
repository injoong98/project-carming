package com.carming.backend.place.dto.response;

import lombok.Data;

@Data
public class PopularPlaceDetail {

    private String id;

    private String name;

    private String image;

    private String region;

    private String address;

    private Integer ratingSum;

    private Integer ratingCount;

    private PlaceTagsBox tags;

}
