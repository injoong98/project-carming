package com.carming.backend.review.controller;

import com.carming.backend.course.service.CourseService;
import com.carming.backend.review.dto.request.ReviewRequestDto;
import com.carming.backend.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/reviews")
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<Void> saveReview(@RequestBody ReviewRequestDto request) {
       Long memberId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());

        if (isNewCourse(request)) {
            request.getCourseReview().setCourseId(courseService.saveCourse(request));
        }

        reviewService.saveReview(request, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private boolean isNewCourse(ReviewRequestDto request) {
        if (request.getCourseReview().getCourseId() == null) {
            return true;
        }
        return false;
    }
}
