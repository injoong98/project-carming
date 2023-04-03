package com.carming.backend.course.service;

import com.carming.backend.common.SplitFactory;
import com.carming.backend.course.domain.Course;
import com.carming.backend.course.dto.request.CourseSearch;
import com.carming.backend.course.dto.response.CoursePlaceResponse;
import com.carming.backend.course.dto.response.CourseResponseDto;
import com.carming.backend.course.dto.response.PopularCourseListDto;
import com.carming.backend.course.exception.CourseNotFound;
import com.carming.backend.course.repository.CourseRepository;
import com.carming.backend.place.domain.Place;
import com.carming.backend.place.repository.PlaceRepository;
import com.carming.backend.review.dto.request.ReviewRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CourseService {

    private final Long DEFAULT_POPULAR_SIZE = 3L;

    private final CourseRepository courseRepository;

    private final PlaceRepository placeRepository;

    public boolean isNewCourse(List<Long> placeKeys) {
        return courseRepository.findCourseByPlaces(convertLongToString(placeKeys)).isEmpty();
    }

    @Transactional
    public Long saveCourse(ReviewRequestDto request) {
        List<Long> placeKeys = request.getPlaceReviews().stream()
                .map(placeReview -> placeReview.getPlaceId())
                .collect(Collectors.toList());
        List<String> regions = placeRepository.findRegionsById(placeKeys);

        Course savedCourse = courseRepository.save(request.toCourseEntity(regions));
        return savedCourse.getId();
    }

    public List<CourseResponseDto> findCourses(CourseSearch search) {
        List<Course> courses = courseRepository.findCourses(search);
        return courses.stream()
                .map(this::convertToCourseResponse)
                .collect(Collectors.toList());
    }

    public List<PopularCourseListDto> findPopularCourseList() {
        List<Course> courses = courseRepository.findCourses(new CourseSearch(null, DEFAULT_POPULAR_SIZE));
        return courses.stream()
                .map(this::convertToPopularResponse)
                .collect(Collectors.toList());
    }

    public CourseResponseDto findPopularDetail(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(CourseNotFound::new);
        return convertToCourseResponse(course);
    }

    private String convertLongToString(List<Long> placeKeys) {
        StringBuilder builder = new StringBuilder();
        placeKeys.stream().forEach(placeId -> builder.append(placeId + "|"));
        return builder.deleteCharAt(builder.length() - 1).toString();
    }

    private CourseResponseDto convertToCourseResponse(Course course) {
        List<Place> places = placeRepository.findPlacesByCourse(SplitFactory.splitPlaces(course.getPlaces()));
        List<CoursePlaceResponse> placesByCourse = places.stream().map(CoursePlaceResponse::from).collect(Collectors.toList());
        return CourseResponseDto.from(course, placesByCourse);
    }

    private PopularCourseListDto convertToPopularResponse(Course course) {
        List<String> placeNames = placeRepository.findPlaceNamesById(SplitFactory.splitPlaces(course.getPlaces()));
        return new PopularCourseListDto(course, placeNames);
    }
}
