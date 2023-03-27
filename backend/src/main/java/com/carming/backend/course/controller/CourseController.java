package com.carming.backend.course.controller;

import com.carming.backend.course.dto.response.CourseResponseDto;
import com.carming.backend.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/courses")
@RestController
public class CourseController {

    private final CourseService courseService;

    //todo
    @GetMapping
    public List<CourseResponseDto> getCourses() {
        return null;
    }

    //todo
    @PostMapping
    public ResponseEntity<Void> saveCourse() {
        return null;
    }
}
