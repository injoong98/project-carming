package com.carming.backend.place.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "place")
@Entity
public class Place {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;

    @Column(name = "place_name")
    private String name;

    @Column(name = "place_tel")
    private String tel;

    @Enumerated(EnumType.STRING)
    @Column(name = "place_category")
    private PlaceCategory category;

    @Column(name = "place_lon")
    private Double lon;

    @Column(name = "place_lan")
    private Double lan;

    @Column(name = "place_region")
    private String region;

    @Column(name = "place_rating_count")
    private Integer ratingCount;

    @Column(name = "place_rating_sum")
    private Integer ratingSum;

    @Column(name = "place_keyword")
    private String keyword;

    @Column(name = "place_image")
    private String image;


    @Builder
    public Place(String name, String tel, PlaceCategory category,
                 Double lon, Double lan,
                 String region, Integer ratingCount, Integer ratingSum,
                 String keyword, String image) {
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
