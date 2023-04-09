package com.carming.backend.course.repository;

import com.carming.backend.TestConfig;
import com.carming.backend.course.domain.Course;
import com.carming.backend.course.dto.request.CourseSearch;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@Import(TestConfig.class)
class CourseRepositoryTest {

    @Autowired
    CourseRepository courseRepository;

    @Test
    @DisplayName("선택 지역리스트에 포함된 코스를 가져온다.")
    void findCourseByRegions() {
        //given
        Course test1 = createCourse("1|2|3|4", "은평구|마포구|용산구", "TEST1");
        Course test2 = createCourse("1|5|7|9", "관악구|은평구|강남구", "TEST2");
        Course test3 = createCourse("1|3|5|9", "서초구|노원구|은평구", "TEST3");
        Course test4 = createCourse("1|11|663|5134", "강동구|종로구|서대문구", "TEST4");
        Course test5 = createCourse("1|65|603|534", "강동구|종로구|마포구", "TEST5");

        saveCourse(test1, test2, test3, test4, test5);
        CourseSearch search = new CourseSearch(List.of("은평구", "마포구", "동작구"), null, null);

        //when
        List<Course> courses = courseRepository.findCourses(search);

        //then
        assertThat(courses).isEqualTo(List.of(test1, test2, test3, test5));
        assertThat(courses.size()).isEqualTo(4);
    }

    private void saveCourse(Course... courses) {
        for (Course course : courses) {
            courseRepository.save(course);
        }
    }

    private Course createCourse(String places, String regions, String name) {
        return Course.builder()
                .places(places)
                .regions(regions)
                .name(name)
                .build();
    }
}