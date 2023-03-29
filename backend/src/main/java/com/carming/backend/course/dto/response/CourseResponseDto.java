package com.carming.backend.course.dto.response;

import com.carming.backend.common.SplitFactory;
import com.carming.backend.course.domain.Course;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class CourseResponseDto {

    private String name;

    private List<String> regions;

    private List<CoursePlaceResponse> places;

    @Builder
    public CourseResponseDto(String name,
                             List<String> regions,
                             List<CoursePlaceResponse> places) {
        this.name = name;
        this.regions = regions;
        this.places = places;
    }

    public static CourseResponseDto from(Course course, List<CoursePlaceResponse> places) {
        return CourseResponseDto.builder()
                .name(course.getName())
                .regions(SplitFactory.splitRegions(course.getRegions()))
                .places(places)
                .build();
    }
}
