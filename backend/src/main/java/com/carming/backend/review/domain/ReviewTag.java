package com.carming.backend.review.domain;

import com.carming.backend.tag.domain.Tag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "review_tag")
@Entity
public class ReviewTag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_tag_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "review_id")
    private Review review;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public ReviewTag(Review review, Tag tag) {
        this.review = review;
        review.addReviewTag(this);
        this.tag = tag;
    }

    public void changeReview(Review review) {
        this.review = review;
        review.addReviewTag(this);
    }
}
