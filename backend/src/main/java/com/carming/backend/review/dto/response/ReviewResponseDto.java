package com.carming.backend.review.dto.response;

import com.carming.backend.review.domain.Review;
import com.carming.backend.review.domain.ReviewTag;
import com.carming.backend.tag.domain.Tag;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Data
public class ReviewResponseDto {

    private String profile;

    private String nickname;

    private Integer rating;

    private String content;

    private List<String> tags;

    private String createdTime;

    @Builder
    public ReviewResponseDto(String profile, String nickname,
                             Integer rating, String content,
                             List<String> tags, String createdTime) {
        this.profile = profile;
        this.nickname = nickname;
        this.rating = rating;
        this.content = content;
        this.tags = tags;
        this.createdTime = createdTime;
    }

    public static ReviewResponseDto from(Review review) {
        return ReviewResponseDto.builder()
                .profile(review.getMember().getProfile())
                .nickname(review.getMember().getNickname())
                .rating(review.getCourseRating())
                .content(review.getContent())
                .tags(getTags(review))
                .createdTime(review.getCreatedTime().toLocalDate().toString())
                .build();
    }

    public static List<String> getTags(Review review) {
        return review.getReviewTags().stream()
                .map(reviewTag -> reviewTag.getTag().getName())
                .collect(Collectors.toList());
    }
}
