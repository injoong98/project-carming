package com.carming.backend.course.dto.response;

import com.carming.backend.course.domain.Course;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CheckCourseDto {

    private Long courseId;

    private boolean newCourse;

    public CheckCourseDto(Course course) {
        this.courseId = course == null ? null : course.getId();
        this.newCourse = course == null ? true : false;
    }
}
