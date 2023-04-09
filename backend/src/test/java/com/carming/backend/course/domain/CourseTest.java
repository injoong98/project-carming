package com.carming.backend.course.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CourseTest {

    @Test
    @DisplayName("Regions, Places split 테스트")
    void splitTest() {
        //given
        Course course = new Course("1|2|3|4", "은평구|노원구|종로구", "Test1", 0, 0);

        //when
        String[] regions = course.getRegions().split("\\|");
        String[] places = course.getPlaces().split("\\|");

        //then
        assertThat(places.length).isEqualTo(4);
        assertThat(regions.length).isEqualTo(3);
    }
}