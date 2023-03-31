package com.carming.backend.review.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReviewRequestDto {

    List<PlaceReviewRequest> placeReviews;

    CourseReviewRequest courseReview;


    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class PlaceReviewRequest {

        private Long placeId;

        private List<Long> placeTags;

        private Integer placeRating;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class CourseReviewRequest {

        private Long courseId;

        private List<Long> courseTags;

        private Integer courseRating;

        private String content;
    }
}
