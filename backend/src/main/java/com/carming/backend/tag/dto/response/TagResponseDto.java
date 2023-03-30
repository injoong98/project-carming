package com.carming.backend.tag.dto.response;

import com.carming.backend.tag.domain.Category;
import com.carming.backend.tag.domain.Tag;
import lombok.Builder;
import lombok.Data;

@Data
public class TagResponseDto {

    private Long id;

    private String name;

    private Category category;

    @Builder
    public TagResponseDto(Long id, String name, Category category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    public static TagResponseDto from(Tag tag) {
        return TagResponseDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .category(tag.getCategory())
                .build();
    }
}
