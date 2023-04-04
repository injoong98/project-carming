package com.carming.backend.place.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class PlaceSearch {

    private final static Long DEFAULT_SIZE = 50L;

    private List<String> regions;

    private String category;

    private Long size = DEFAULT_SIZE;

    private Integer page;

    public PlaceSearch(List<String> regions, String category, Long size) {
        this.regions = regions;
        this.category = category;
        this.size = size == null ? DEFAULT_SIZE : size;
    }

    public long getOffset() {
        return (this.page-1) * this.size;
    }
}
