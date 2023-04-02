package com.carming.backend.place.controller;

import com.carming.backend.place.dto.request.PlaceSearch;
import com.carming.backend.place.dto.response.PlaceResponseDto;
import com.carming.backend.place.dto.response.PlaceTagsBox;
import com.carming.backend.place.dto.response.PopularPlaceResponseDto;
import com.carming.backend.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/places")
@RestController
public class PlaceController {

    private final PlaceService placeService;

    //todo: must delete, only for spring security test
    @GetMapping("/test")
    public String test() {
        return "Login OK";
    }

    @GetMapping
    public List<PlaceResponseDto> getPlaces(@ModelAttribute PlaceSearch search) {
        log.info("search = {}", search);
        return placeService.getPlaces(search);
    }

    @GetMapping("/popular")
    public List<PopularPlaceResponseDto> getPopularPlaces() {
        return placeService.getPopularPlaces();
    }

    @GetMapping("/popular/{id}")
    public List<PlaceTagsBox> getPopularPlaceDetail(@PathVariable("id") Long placeId) {
        List<PlaceTagsBox> popularPlaceDetail = placeService.getPopularPlaceDetail(placeId);
        return popularPlaceDetail;

    }
}
