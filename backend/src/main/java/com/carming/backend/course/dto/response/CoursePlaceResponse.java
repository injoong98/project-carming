package com.carming.backend.course.dto.response;

import lombok.Data;

@Data
public class CoursePlaceResponse {

    private Long id;

    private String name;

    private Double lon;

    private Double lat;

    private String image;

    private Integer ratingCount;

    private Integer ratingSum;

}
