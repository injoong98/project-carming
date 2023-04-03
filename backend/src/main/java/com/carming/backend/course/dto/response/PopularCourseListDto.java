package com.carming.backend.course.dto.response;

import com.carming.backend.course.domain.Course;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class PopularCourseListDto {

    private Long id;

    private Integer ratingCount;

    private Integer ratingSum;

    private List<String> placeNames;

    public PopularCourseListDto(Course course, List<String> placeNames) {
        this.id = course.getId();
        this.ratingCount = course.getRatingCount();
        this.ratingSum = course.getRatingSum();
        this.placeNames = placeNames;
    }
}
