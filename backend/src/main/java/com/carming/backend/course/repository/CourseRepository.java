package com.carming.backend.course.repository;

import com.carming.backend.course.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CourseRepositoryCustom, JpaRepository<Course, Long> {
}
