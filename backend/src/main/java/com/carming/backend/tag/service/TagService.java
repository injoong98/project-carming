package com.carming.backend.tag.service;

import com.carming.backend.tag.domain.Category;
import com.carming.backend.tag.dto.response.TagResponseDto;
import com.carming.backend.tag.dto.response.TagResult;
import com.carming.backend.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagResult findTags() {
        List<TagResponseDto> tags = tagRepository.findAll().stream()
                .map(TagResponseDto::from)
                .collect(Collectors.toList());
        return divideTags(tags);

    }

    //Todo refactoring - too ugly
    private TagResult divideTags(List<TagResponseDto> tags) {
        TagResult tagResult = new TagResult();
        for (TagResponseDto tag : tags) {
            if (tag.getCategory().equals(Category.CAFE)) {
                tagResult.getCafeTags().add(tag);
            }
            if (tag.getCategory().equals(Category.FOOD)) {
                tagResult.getFoodTags().add(tag);
            }
            if (tag.getCategory().equals(Category.PLAY)) {
                tagResult.getPlayTags().add(tag);
            }
            if (tag.getCategory().equals(Category.SLEEP)) {
                tagResult.getSleepTags().add(tag);
            }
            if (tag.getCategory().equals(Category.ATTRACTION)) {
                tagResult.getAttractionTags().add(tag);
            }
            if (tag.getCategory().equals(Category.COURSE)) {
                tagResult.getCourseTags().add(tag);
            }
        }
        return tagResult;
    }
}
