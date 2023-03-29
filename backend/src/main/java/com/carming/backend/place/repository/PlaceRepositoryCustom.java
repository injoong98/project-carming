package com.carming.backend.place.repository;

import com.carming.backend.course.dto.response.CoursePlaceResponse;
import com.carming.backend.place.domain.Place;
import com.carming.backend.place.dto.request.PlaceSearch;

import java.util.List;

public interface PlaceRepositoryCustom {

    List<Place> findPlaces(PlaceSearch search);

    List<CoursePlaceResponse> findPlacesByCourse(List<Long> placeKeys);
}
