package com.carming.backend.course.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@Data
public class CourseSearch {

    public final static Integer DEFAULT_SIZE = 30;

    public final static Integer DEFAULT_PAGE = 1;

    public final static Integer MAX_SIZE = 1000;

    private List<String> regions;

    private Integer size = DEFAULT_SIZE;

    private Integer page = DEFAULT_PAGE;

    public CourseSearch(List<String> regions, Integer size, Integer page) {
        this.regions = regions;
        this.size = size != null ? size : DEFAULT_SIZE;
        this.page = page != null ? page : DEFAULT_PAGE;
    }

    public long getOffset() {
        return (Math.max(page, 1) - 1) * Math.min(size, MAX_SIZE);
    }
}
