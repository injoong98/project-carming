package com.carming.backend.place.controller;

import com.carming.backend.place.domain.Place;
import com.carming.backend.place.domain.PlaceCategory;
import com.carming.backend.place.dto.request.PlaceSearch;
import com.carming.backend.place.dto.response.PlaceResponseDto;
import com.carming.backend.place.repository.PlaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Random;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PlaceControllerTest {

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    PlaceController placeController;

    Random random = new Random();

    @Test
    @DisplayName("Place 조건 검색 및 가져오기")
    void getPlacesByPlaceSearch() {
//        //given
//        List<String> savedRegions = List.of("은평구", "용산구", "노원구");
//        savePlaces(savedRegions, 100);
//
//        //when
//        List<PlaceResponseDto> placesWithCategory = placeController.getPlaces(new PlaceSearch(List.of("용산구"), "FOOD", 200L));
//        List<PlaceResponseDto> placesNoCategory = placeController.getPlaces(new PlaceSearch(List.of("용산구"), null, 200L));
//
//        //then
//        assertThat(placesWithCategory.size()).isEqualTo(100);
//        assertThat(placesNoCategory.size()).isEqualTo(200);
    }

    private void savePlaces(List<String> regions, int count) {
        PlaceCategory[] categories = PlaceCategory.class.getEnumConstants();
        for (String region : regions) {
            for (PlaceCategory category : categories) {
                for (int i = 0; i < count; i++) {
                    placeRepository.save(createPlace(region, category));
                }
            }
        }
    }

    private Place createPlace(String region, PlaceCategory category) {
        return Place.builder()
                .region(region)
                .category(category)
                .ratingSum(random.nextInt(100000))
                .build();
    }
}