package com.carming.backend.place.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class PlaceSearch {

    private final static Integer DEFAULT_SIZE = 50;

    private final static Integer DEFAULT_PAGE = 1;

    private final static Integer MAX_SIZE = 1000;

    private List<String> regions;

    private String category;

    private Long tagId;

    private Integer size = DEFAULT_SIZE;

    private Integer page = DEFAULT_PAGE;

    public PlaceSearch(List<String> regions, String category, Long tagId, Integer size, Integer page) {
        this.regions = regions;
        this.category = category;
        this.tagId = tagId;
        this.size = size == null ? DEFAULT_SIZE : size;
        this.page = page == null ? DEFAULT_PAGE : page;
    }

    public long getOffset() {
        return (Math.max(page, 1) - 1) * Math.min(size, MAX_SIZE);
    }
}
