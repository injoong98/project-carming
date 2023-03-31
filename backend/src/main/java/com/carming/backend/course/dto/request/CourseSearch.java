package com.carming.backend.course.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@Data
public class CourseSearch {

    public final static Long DEFAULT_SIZE = 30L;

    private List<String> regions;

    private Long size = DEFAULT_SIZE;

    public CourseSearch(List<String> regions, Long size) {
        this.regions = regions;
        this.size = size == null ? DEFAULT_SIZE : size;
    }
}
