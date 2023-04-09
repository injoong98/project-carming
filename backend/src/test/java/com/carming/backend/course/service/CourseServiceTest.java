package com.carming.backend.course.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

class CourseServiceTest {


    @Test
    @DisplayName("Long List to String with '|'")
    void convertListToStringWith() {
        //given
        List<Long> places = List.of(1L, 2L, 3L, 4L);
        StringBuilder sb = new StringBuilder();

        //when
        for (Long place : places) {
            sb.append(place + "|");
        }
        sb.deleteCharAt(sb.length() - 1);

        //then
        Assertions.assertThat(sb.toString()).isEqualTo("1|2|3|4");
    }
}