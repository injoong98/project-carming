package com.carming.backend.course.controller;

import com.carming.backend.course.dto.request.CourseSearch;
import com.carming.backend.course.dto.response.CourseResponseDto;
import com.carming.backend.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/courses")
@RestController
public class CourseController {

    private final CourseService courseService;

    /**
     * 지역구에 따른 코스 검색
     */
    @GetMapping
    public List<CourseResponseDto> findCourses(@RequestBody CourseSearch search) {
        return courseService.findCourses(search);
    }

    //todo
    @PostMapping
    public ResponseEntity<Void> saveCourse() {
        return null;
    }
}
