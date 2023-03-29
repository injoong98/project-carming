package com.carming.backend.course.service;

import com.carming.backend.common.SplitFactory;
import com.carming.backend.course.domain.Course;
import com.carming.backend.course.dto.request.CourseSearch;
import com.carming.backend.course.dto.response.CoursePlaceResponse;
import com.carming.backend.course.dto.response.CourseResponseDto;
import com.carming.backend.course.exception.CourseNotFound;
import com.carming.backend.course.repository.CourseRepository;
import com.carming.backend.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CourseService {

    private final CourseRepository courseRepository;

    private final PlaceRepository placeRepository;

    public void findCourseByPlaces(String places) {
        courseRepository.findCourseByPlaces(places)
                .orElseThrow(CourseNotFound::new);
    }

    public List<CourseResponseDto> findCourses(CourseSearch search) {
        List<Course> courses = courseRepository.findCourses(search);
        return courses.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private CourseResponseDto convertToResponse(Course course) {
        List<Long> placeKeys = SplitFactory.splitPlaces(course.getPlaces());
        List<CoursePlaceResponse> placesByCourse = placeRepository.findPlacesByCourse(placeKeys);
        return CourseResponseDto.from(course, placesByCourse);
    }
}
