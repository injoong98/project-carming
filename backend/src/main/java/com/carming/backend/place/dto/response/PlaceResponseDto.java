package com.carming.backend.place.dto.response;

import com.carming.backend.place.domain.Place;
import com.carming.backend.place.domain.PlaceCategory;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PlaceResponseDto {

    private Long id;

    private String name;

    private String tel;

    private PlaceCategory category;

    private Double lon;

    private Double lan;

    private String region;

    private Integer ratingCount;

    private Integer ratingSum;

    private List<String> keyword;

    private String image;

    public static PlaceResponseDto from(Place place) {
        return PlaceResponseDto.builder()
                .id(place.getId())
                .name(place.getName())
                .tel(place.getTel())
                .category(place.getCategory())
                .lon(place.getLon())
                .lan(place.getLan())
                .region(place.getRegion())
                .ratingCount(place.getRatingCount())
                .ratingSum(place.getRatingSum())
                .keyword(separateKeyword(place.getKeyword()))
                .image(place.getImage())
                .build();
    }

    private static List<String> separateKeyword(String keyword) {
        String[] keywords = keyword.split("\\|");
        return Arrays.stream(keywords).collect(Collectors.toList());
    }


    @QueryProjection
    @Builder
    public PlaceResponseDto(Long id, String name, String tel, PlaceCategory category,
                            Double lon, Double lan, String region,
                            Integer ratingCount, Integer ratingSum, List<String> keyword, String image) {
        this.id = id;
        this.name = name;
        this.tel = tel;
        this.category = category;
        this.lon = lon;
        this.lan = lan;
        this.region = region;
        this.ratingCount = ratingCount;
        this.ratingSum = ratingSum;
        this.keyword = keyword;
        this.image = image;
    }
}
