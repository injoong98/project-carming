package com.carming.backend.course.dto.request;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class CourseSearchTest {

    @Test
    @DisplayName("size를 따로 입력하지 않으면 size는 기본 30이다")
    void defaultSize() {
        //given
        CourseSearch searchCondition = new CourseSearch(List.of("은평구"), null, null);

        //expected
        assertThat(searchCondition.getSize()).isEqualTo(CourseSearch.DEFAULT_SIZE);
        assertThat(searchCondition.getRegions()).isEqualTo(List.of("은평구"));
    }

}