package com.carming.backend.place.controller;

import com.carming.backend.place.dto.request.PlaceSearch;
import com.carming.backend.place.dto.response.PlaceResponseDto;
import com.carming.backend.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<PlaceResponseDto> getPlaces(@RequestBody PlaceSearch search) {
        return placeService.getPlaces(search);
    }
}
