package com.carming.backend.course.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
public class CourseSearch {

    public final static Long DEFAULT_SIZE = 30L;

    private List<String> regions;

    private Long size;

    @Builder
    public CourseSearch(List<String> regions, Long size) {
        this.regions = regions;
        this.size = size == null ? DEFAULT_SIZE : size;
    }
}
