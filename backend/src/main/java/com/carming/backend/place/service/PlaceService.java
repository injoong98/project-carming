package com.carming.backend.place.service;

import com.carming.backend.place.domain.Place;
import com.carming.backend.place.dto.request.PlaceSearch;
import com.carming.backend.place.dto.response.PlaceResponseDto;
import com.carming.backend.place.dto.response.PlaceTagsBox;
import com.carming.backend.place.dto.response.PopularPlaceResponseDto;
import com.carming.backend.place.repository.PlaceRepository;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PlaceService {

    private final Long DEFAULT_POPULAR_SIZE = 20L;

    private final PlaceRepository placeRepository;

    public List<PlaceResponseDto> getPlaces(PlaceSearch search) {
        List<Place> places = placeRepository.findPlaces(search);
        return places.stream()
                .map(PlaceResponseDto::from)
                .collect(Collectors.toList());
    }

    public List<PopularPlaceResponseDto> getPopularPlaces() {
        return placeRepository.getPopular(DEFAULT_POPULAR_SIZE);
    }

    public List<PlaceTagsBox> getPopularPlaceDetail(Long placeId) {
        List<PlaceTagsBox> placeTag = placeRepository.getPlaceTag(placeId);


        return placeTag;
    }
}
