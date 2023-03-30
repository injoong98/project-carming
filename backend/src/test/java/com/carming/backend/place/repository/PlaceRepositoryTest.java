package com.carming.backend.place.repository;

import com.carming.backend.SetUpDb;
import com.carming.backend.TestConfig;
import com.carming.backend.place.dto.response.PopularPlaceResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import({TestConfig.class, SetUpDb.class})
class PlaceRepositoryTest {

    @Autowired
    PlaceRepository placeRepository;

    @Test
    @DisplayName("인기 순으로 20개의 장소를 조회한다.")
    void popularPlaces() {
        //given
        Comparator<PopularPlaceResponseDto> ratingComparator = new Comparator<>() {
            @Override
            public int compare(PopularPlaceResponseDto o1, PopularPlaceResponseDto o2) {
                return o2.getRatingSum() - o1.getRatingSum();
            }
        };

        //when
        List<PopularPlaceResponseDto> popularPlaces = placeRepository.getPopular(20L);
        List<PopularPlaceResponseDto> copy = new ArrayList<>(popularPlaces);
        copy.sort(ratingComparator);

        //then
        assertThat(popularPlaces).isEqualTo(copy);
        assertThat(popularPlaces.get(0).getRatingSum()).isGreaterThan(popularPlaces.get(1).getRatingSum());
    }
}