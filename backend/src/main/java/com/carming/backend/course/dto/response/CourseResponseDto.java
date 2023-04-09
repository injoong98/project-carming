package com.carming.backend.course.dto.response;

import com.carming.backend.common.SplitFactory;
import com.carming.backend.course.domain.Course;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class CourseResponseDto {

    private Long id;

    private String name;

    private Integer ratingCount;

    private Integer ratingSum;

    private List<String> regions;

    private List<CoursePlaceResponse> places;

    @Builder
    public CourseResponseDto(Long id, String name,
                             Integer ratingCount, Integer ratingSum,
                             List<String> regions,
                             List<CoursePlaceResponse> places) {
        this.id = id;
        this.name = name;
        this.ratingCount = ratingCount;
        this.ratingSum = ratingSum;
        this.regions = regions;
        this.places = places;
    }

    public static CourseResponseDto from(Course course, List<CoursePlaceResponse> places) {
        return CourseResponseDto.builder()
                .id(course.getId())
                .name(course.getName())
                .ratingCount(course.getRatingCount())
                .ratingSum(course.getRatingSum())
                .regions(SplitFactory.splitRegions(course.getRegions()))
                .places(places)
                .build();
    }
}
