package com.carming.backend.course.controller;

import com.carming.backend.course.dto.request.CourseSearch;
import com.carming.backend.course.dto.response.CheckCourseDto;
import com.carming.backend.course.dto.response.CourseResponseDto;
import com.carming.backend.course.dto.response.PopularCourseListDto;
import com.carming.backend.course.service.CourseService;
import com.carming.backend.review.dto.response.ReviewResponseDto;
import com.carming.backend.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/courses")
@RestController
public class CourseController {

    private final CourseService courseService;

    private final ReviewService reviewService;

    /**
     * 지역구에 따른 코스 검색
     */
    @GetMapping
    public List<CourseResponseDto> findCourses(@ModelAttribute CourseSearch search) {
        return courseService.findCourses(search);
    }

    /**
     * 코스에 따른 리뷰
     */
    @GetMapping("/{id}/reviews")
    public List<ReviewResponseDto> findCourseReviews(@PathVariable Long id) {
        return reviewService.findByCourseTest1(id);
    }

    /**
     * 인기 코스 리스트
     */
    @GetMapping("/popular")
    public List<PopularCourseListDto> findPopularCourses() {
        return courseService.findPopularCourseList();
    }

    /**
     * 인기 코스 상세
     */
    @GetMapping("/popular/{courseId}")
    public ResponseEntity<CourseResponseDto> findPopularDetail(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.findPopularDetail(courseId));
    }

    @GetMapping("/new")
    public ResponseEntity<CheckCourseDto> isNewCourse(@RequestParam List<Long> placeKeys) {
        return ResponseEntity.ok(courseService.isNewCourse(placeKeys));
    }

}
