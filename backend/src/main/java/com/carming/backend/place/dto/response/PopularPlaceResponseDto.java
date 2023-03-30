package com.carming.backend.place.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class PopularPlaceResponseDto {

    private String image;

    private String name;

    private String region;

    private Integer ratingSum;

    private Integer ratingCount;

}
