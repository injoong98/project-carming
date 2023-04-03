package com.carming.backend.review.dto.request;

import com.carming.backend.course.domain.Course;
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

        private String name;

        private List<Long> courseTags;

        private Integer courseRating;

        private String content;
    }

    public Course toCourseEntity(List<String> regions) {
        return Course.builder()
                .places(getPlaceKeys(placeReviews))
                .regions(getRegions(regions))
                .name(courseReview.name)
                .ratingCount(1)
                .ratingSum(courseReview.courseRating)
                .build();
    }

    private String getPlaceKeys(List<PlaceReviewRequest> placeReviews) {
        StringBuilder builder = new StringBuilder();

        placeReviews.stream().map(review -> review.getPlaceId())
                .forEach(id -> builder.append(id + "|"));
        return builder.deleteCharAt(builder.length() - 1).toString();
    }

    private String getRegions(List<String> regions) {
        StringBuilder builder = new StringBuilder();
        regions.stream()
                .forEach(region -> builder.append(region + "|"));
        return builder.deleteCharAt(builder.length() - 1).toString();
    }
}
