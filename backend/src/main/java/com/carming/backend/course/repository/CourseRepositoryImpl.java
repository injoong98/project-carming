package com.carming.backend.course.repository;

import com.carming.backend.course.domain.Course;
import com.carming.backend.course.dto.request.CourseSearch;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.carming.backend.course.domain.QCourse.*;

@RequiredArgsConstructor
public class CourseRepositoryImpl implements CourseRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<Course> findCourseByPlaces(String places) {
        return Optional.ofNullable(queryFactory
                .selectFrom(course)
                .where(course.places.eq(places))
                .fetchFirst());
    }

    @Override
    public List<Course> findCourses(CourseSearch search) {
        return queryFactory
                .selectFrom(course)
                .where(containsRegions(search))
                .orderBy(course.ratingSum.desc())
                .offset(search.getOffset())
                .limit(search.getSize())
                .fetch();
    }

    private BooleanBuilder containsRegions(CourseSearch search) {
        if (search.getRegions() == null) {
            return null;
        }
        BooleanBuilder builder = new BooleanBuilder();

        for (String region : search.getRegions()) {
            builder.or(course.regions.contains(region));
        }

        return builder;
    }
}
