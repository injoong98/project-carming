//package com.carming.backend.tag.service;
//
//import com.carming.backend.tag.domain.Category;
//import com.carming.backend.tag.domain.Tag;
//import com.carming.backend.tag.dto.response.TagResult;
//import com.carming.backend.tag.repository.TagRepository;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.*;
//
//@SpringBootTest
//class TagServiceTest {
//
//    @Autowired
//    TagService tagService;
//
//    @Autowired
//    TagRepository tagRepository;
//
//
//    @Test
//    @DisplayName("카테고리 별로 태그 분류하기")
//    void getTags() {
//        //given
//        Integer tagCount = 4;
//        saveTags(tagCount);
//
//        //when
//        TagResult tags = tagService.findTags();
//
//        //then
//        assertThat(tags.getCafeTags().size()).isEqualTo(tagCount);
//        assertThat(tags.getCafeTags().get(0).getName()).isEqualTo(Category.CAFE.name() + 0);
//
//        assertThat(tags.getFoodTags().size()).isEqualTo(tagCount);
//        assertThat(tags.getFoodTags().get(0).getName()).isEqualTo(Category.FOOD.name() + 0);
//
//        assertThat(tags.getPlayTags().size()).isEqualTo(tagCount);
//        assertThat(tags.getPlayTags().get(0).getName()).isEqualTo(Category.PLAY.name() + 0);
//
//        assertThat(tags.getAttractionTags().size()).isEqualTo(tagCount);
//        assertThat(tags.getAttractionTags().get(0).getName()).isEqualTo(Category.ATTRACTION.name() + 0);
//
//        assertThat(tags.getSleepTags().size()).isEqualTo(tagCount);
//        assertThat(tags.getSleepTags().get(0).getName()).isEqualTo(Category.SLEEP.name() + 0);
//
//        assertThat(tags.getCourseTags().size()).isEqualTo(tagCount);
//        assertThat(tags.getCourseTags().get(0).getName()).isEqualTo(Category.COURSE.name() + 0);
//    }
//
//    private void saveTags(int count) {
//        Category[] categories = Category.class.getEnumConstants();
//        Arrays.stream(categories).forEach(category -> {
//            for (int i = 0; i < count; i++) {
//                tagRepository.save(new Tag(category.name() + i, category));
//            }
//        });
//    }
//
//}