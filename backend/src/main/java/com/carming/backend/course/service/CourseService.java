package com.carming.backend.course.service;

import com.carming.backend.course.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CourseService {

    private final CourseRepository courseRepository;
}
