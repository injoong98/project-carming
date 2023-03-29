package com.carming.backend.course.repository;

import com.carming.backend.course.domain.Course;
import com.carming.backend.course.dto.request.CourseSearch;

import java.util.List;
import java.util.Optional;

public interface CourseRepositoryCustom {

    Optional<Course> findCourseByPlaces(String places);

    List<Course> findCourses(CourseSearch search);
}
