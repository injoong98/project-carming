package com.carming.backend.place.dto.request;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PlaceSearchTest {

    @Test
    @DisplayName("PlaceSearch 생성 시 size null 이면, DEFAULT_SIZE가 넣어진다")
    void defaultSizeForPlaceSearch() {
        PlaceSearch placeSearch = new PlaceSearch(null, null, null);
        Assertions.assertThat(placeSearch.getSize()).isEqualTo(50L);
    }

}