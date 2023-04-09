package com.carming.backend.place.dto.response.popular;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PopularPlaceListDto {

    private Long id;

    private String name;

    private String image;

    private String region;

    private String address;

    private Integer ratingSum;

    private Integer ratingCount;
}
