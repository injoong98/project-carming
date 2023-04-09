package com.carming.backend.course.dto.response;

import com.carming.backend.common.SplitFactory;
import com.carming.backend.course.domain.Course;
import com.carming.backend.place.domain.Place;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class CoursePlaceResponse {

    private Long id;

    private String name;

    private Double lon;

    private Double lat;

    private String image;

    private String region;

    private List<String> keyword;

    private Integer ratingCount;

    private Integer ratingSum;

    @Builder
    public CoursePlaceResponse(Long id, String name, Double lon, Double lat,
                               String image, String region, List<String> keyword,
                               Integer ratingCount, Integer ratingSum) {
        this.id = id;
        this.name = name;
        this.lon = lon;
        this.lat = lat;
        this.image = image;
        this.region = region;
        this.keyword = keyword;
        this.ratingCount = ratingCount;
        this.ratingSum = ratingSum;
    }

    public static CoursePlaceResponse from(Place place) {
        return CoursePlaceResponse.builder()
                .id(place.getId())
                .name(place.getName())
                .lon(place.getLon())
                .lat(place.getLat())
                .image(place.getImage())
                .region(place.getRegion())
                .keyword(SplitFactory.splitKeyword(place.getKeyword()))
                .ratingCount(place.getRatingCount())
                .ratingSum(place.getRatingSum())
                .build();
    }

}
