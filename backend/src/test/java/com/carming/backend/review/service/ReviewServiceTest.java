package com.carming.backend.review.service;

import com.carming.backend.place.domain.Place;
import com.carming.backend.place.domain.PlaceTag;
import com.carming.backend.place.repository.PlaceRepository;
import com.carming.backend.place.repository.PlaceTagRepository;
import com.carming.backend.review.domain.Review;
import com.carming.backend.review.dto.request.ReviewRequestDto;
import com.carming.backend.review.dto.response.ReviewResponseDto;
import com.carming.backend.review.repository.ReviewRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ReviewServiceTest {

    @Autowired
    ReviewService reviewService;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    PlaceTagRepository placeTagRepository;

    @Autowired
    ReviewRepository reviewRepository;


    @Test
    @DisplayName("리뷰 저장")
    void saveReview() {
        //given
        ReviewRequestDto.CourseReviewRequest courseReview = new ReviewRequestDto.CourseReviewRequest(1L, null, List.of(1L, 2L), 5, "재미있습니다.");
        ReviewRequestDto.PlaceReviewRequest placeReview1 = new ReviewRequestDto.PlaceReviewRequest(1L, List.of(5L, 6L, 7L), 3);
        ReviewRequestDto.PlaceReviewRequest placeReview2 = new ReviewRequestDto.PlaceReviewRequest(2L, List.of(6L, 8L), 5);
        ReviewRequestDto request = new ReviewRequestDto(List.of(placeReview1, placeReview2), courseReview);

        //when
        reviewService.saveReview(request, 1L);

        //then
        List<Review> reviews = reviewRepository.findAll();
        for (Review review : reviews) {
            System.out.println(review.getContent());
        }
        System.out.println();

        Place place1 = placeRepository.findById(1L).get();
        System.out.println("Plac1e rating : " + place1.getRatingSum());
        System.out.println();

        Place place2 = placeRepository.findById(2L).get();
        System.out.println("Place2 rating : " + place2.getRatingSum());
        System.out.println();

        List<PlaceTag> placeTags = placeTagRepository.findAll();
        for (PlaceTag placeTag : placeTags) {
            System.out.println(placeTag.getPlace().getName());
            System.out.println(placeTag.getTag().getName());
        }
        System.out.println();

    }

    @Test
    @DisplayName("리뷰 태그 조회 테스트1")
    void test() {
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

        List<ReviewResponseDto> reviews = reviewService.findByCourseTest1(1L, 10L);

        for (ReviewResponseDto review : reviews) {
            System.out.println(review);
        }
    }

    @Test
    @DisplayName("리뷰 태그 조회 테스트2")
    void test2() {
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

        List<ReviewResponseDto> reviews = reviewService.findByCourseTest2(1L);

        for (ReviewResponseDto review : reviews) {
            System.out.println(review);
        }
    }
}