package com.carming.backend.place.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class PopularPlaceResponseDto {

    private Long id;

    private String name;

    private String image;

    private String region;

    private String address;

    private Integer ratingSum;

    private Integer ratingCount;
}
