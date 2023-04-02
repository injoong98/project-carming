package com.carming.backend.place.repository;

import com.carming.backend.course.dto.response.CoursePlaceResponse;
import com.carming.backend.place.domain.Place;
import com.carming.backend.place.domain.PlaceTag;
import com.carming.backend.place.dto.request.PlaceSearch;
import com.carming.backend.place.dto.response.PlaceTagsBox;
import com.carming.backend.place.dto.response.PopularPlaceResponseDto;
import com.querydsl.core.Tuple;

import java.util.List;

public interface PlaceRepositoryCustom {

    List<Place> findPlaces(PlaceSearch search);

    List<CoursePlaceResponse> findPlacesByCourse(List<Long> placeKeys);

    List<PopularPlaceResponseDto> getPopular(Long size);

    List<PlaceTagsBox> getPlaceTag(Long id);
}
