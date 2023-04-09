package com.carming.backend.course.domain;

import com.carming.backend.review.domain.Review;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "course")
@Entity
public class Course {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    @Column(name = "course_places")
    private String places;

    @Column(name = "course_regions")
    private String regions;

    @Column(name = "course_name")
    private String name;

    @Column(name = "course_rating_count")
    private Integer ratingCount;

    @Column(name = "course_rating_sum")
    private Integer ratingSum;

    @OneToMany(mappedBy = "course")
    private List<Review> reviews = new ArrayList<>();

    @Builder
    public Course(String places, String regions, String name, Integer ratingCount, Integer ratingSum) {
        this.places = places;
        this.regions = regions;
        this.name = name;
        this.ratingCount = (ratingCount == null ? 0 : ratingCount);
        this.ratingSum = (ratingSum == null ? 0 : ratingSum);
    }

    public void addRating(Integer rating) {
        this.ratingSum += rating;
        this.ratingCount += 1;
    }

    //== 연관관계 편의 메소드==//
    public void addReview(Review review) {
        this.reviews.add(review);
    }
}
