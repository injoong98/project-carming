package com.carming.backend.member.dto.request;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

class BirthInfoDtoTest {

    @Test
    @DisplayName("Json BirthInfo를 LocalDate로 변환")
    void convertToLocalDate() {
        final String YEAR = "1993";
        final String MONTH = "12";
        final String DAY = "29";
//        MemberCreateDto.BirthInfoDto birthInfoDto = new MemberCreateDto.BirthInfoDto(YEAR, MONTH, DAY);
//        LocalDate birthday = birthInfoDto.toLocalDate();

//        Assertions.assertThat(birthday).isEqualTo(LocalDate.of(1993, 12, 29));
    }

}