package com.carming.backend.tag.dto.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TagResult {

    private List<TagResponseDto> cafeTags;

    private List<TagResponseDto> foodTags;

    private List<TagResponseDto> playTags;

    private List<TagResponseDto> attractionTags;

    private List<TagResponseDto> sleepTags;

    private List<TagResponseDto> courseTags;

    public TagResult() {
        this.cafeTags = new ArrayList<>();
        this.foodTags = new ArrayList<>();
        this.playTags = new ArrayList<>();
        this.attractionTags = new ArrayList<>();
        this.sleepTags = new ArrayList<>();
        this.courseTags = new ArrayList<>();
    }
}
