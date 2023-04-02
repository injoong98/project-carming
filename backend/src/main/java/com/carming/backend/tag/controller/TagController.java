package com.carming.backend.tag.controller;

import com.carming.backend.tag.dto.response.TagResult;
import com.carming.backend.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/tags")
@RestController
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<TagResult> getTags() {
        return ResponseEntity.ok(tagService.findTags());
    }

}
