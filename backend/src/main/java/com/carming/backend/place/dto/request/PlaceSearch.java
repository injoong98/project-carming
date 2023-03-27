package com.carming.backend.place.dto.request;

import com.carming.backend.place.domain.PlaceCategory;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class PlaceSearch {

    private final static Long DEFAULT_SIZE = 50L;

    private List<String> regions;

    private String category;

    private Long size;


    @Builder
    public PlaceSearch(List<String> regions, String category, Long size) {
        this.regions = regions;
        this.category = category;
        this.size = validNull(size);
    }

    private Long validNull(Long size) {
        if (size == null) {
            size = DEFAULT_SIZE;
        }
        return size;
    }
}
