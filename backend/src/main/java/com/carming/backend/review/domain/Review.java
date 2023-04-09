package com.carming.backend.review.domain;

import com.carming.backend.course.domain.Course;
import com.carming.backend.member.domain.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "review")
@Entity
public class Review {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @Column(name = "review_course_rating")
    private Integer courseRating;

    @Column(name = "review_content")
    private String content;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "course_id")
    Course course;

    @OneToMany(mappedBy = "review")
    List<ReviewTag> reviewTags = new ArrayList<>();

    @Column(name = "review_created_time")
    LocalDateTime createdTime;

    //todo 리뷰가 수정될 일이 있을까?
    @Column(name ="reivew_modified_time")
    LocalDateTime modifiedTime;

    @Builder
    public Review(Integer courseRating, String content) {
        this.courseRating = courseRating;
        this.content = content;

        this.createdTime = LocalDateTime.now();
        this.modifiedTime = createdTime;
    }

    //== 양방향 연관관계 편의 메소드 ==//
    public void changeMember(Member member) {
        this.member = member;
        member.addReview(this);
    }

    public void changeCourse(Course course) {
        this.course = course;
        course.addReview(this);
    }

    public void addReviewTag(ReviewTag reviewTag) {
        reviewTags.add(reviewTag);
    }
}
