package com.carming.backend.place.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class PlaceCategoryTest {

    @Test
    @DisplayName("valueOf 메소드 대문자, 소문자 확인")
    void valueOf_ByEnum() {
        //given
        String upperCategory = "FOOD";
        String lowerCategory = "food";
        String capitalCategory = "Food";

        //expected
        PlaceCategory upper = PlaceCategory.valueOf(upperCategory);
        assertThat(upper).isEqualTo(PlaceCategory.FOOD);
        PlaceCategory lower = PlaceCategory.valueOf(lowerCategory.toUpperCase());
        assertThat(lower).isEqualTo(PlaceCategory.FOOD);
        PlaceCategory capital = PlaceCategory.valueOf(capitalCategory.toUpperCase());
        assertThat(capital).isEqualTo(PlaceCategory.FOOD);

        assertThatThrownBy(() -> PlaceCategory.valueOf(lowerCategory))
                .isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> PlaceCategory.valueOf(capitalCategory))
                .isInstanceOf(IllegalArgumentException.class);
    }

}