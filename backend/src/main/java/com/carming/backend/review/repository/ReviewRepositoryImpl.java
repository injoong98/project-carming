package com.carming.backend.review.repository;

import com.carming.backend.course.domain.QCourse;
import com.carming.backend.member.domain.QMember;
import com.carming.backend.review.domain.QReview;
import com.carming.backend.review.domain.QReviewTag;
import com.carming.backend.review.domain.Review;
import com.carming.backend.review.domain.ReviewTag;
import com.carming.backend.review.dto.response.ReviewResponseDto;
import com.carming.backend.tag.domain.Category;
import com.carming.backend.tag.domain.QTag;
import com.carming.backend.tag.domain.Tag;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.stream.Collectors;

import static com.carming.backend.course.domain.QCourse.*;
import static com.carming.backend.member.domain.QMember.*;
import static com.carming.backend.review.domain.QReview.*;
import static com.carming.backend.review.domain.QReviewTag.*;
import static com.carming.backend.tag.domain.QTag.*;

@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final EntityManagerFactory emf;

    @Override
    public List<Review> findByCourseTest1(Long courseId) {
        return queryFactory.select(review).distinct()
                .from(review)
                .join(review.reviewTags, reviewTag).fetchJoin() //OneToMany
                .join(review.course, course).fetchJoin() //ManyToOne
                .join(review.member, member).fetchJoin()
                .where(review.course.id.eq(courseId))
                .limit(20L)
                .orderBy(review.id.desc())
                .fetch();

//        List<ReviewTag> reviewTags = queryFactory.select(reviewTag)
//                .from(reviewTag)
//                .join(reviewTag.tag, QTag.tag).fetchJoin()
//                .join(reviewTag.review, review).fetchJoin()
//                .where(reviewTag.id.eq(1L))
//                .fetch();
//        boolean isReviewLoaded = emf.getPersistenceUnitUtil().isLoaded(reviewTags.get(0).getReview());
//        boolean isTagLoaded = emf.getPersistenceUnitUtil().isLoaded(reviewTags.get(0).getTag());
//        System.out.println(">>>>>>>>>>>>>");
//
//        System.out.println("Before : " + isReviewLoaded);
//        System.out.println("After : " + isReviewLoaded);
//
//        for (ReviewTag reviewTag : reviewTags) {
//            System.out.println(reviewTag.getTag().getClass());
//            System.out.println(reviewTag.getReview().getClass());
//            System.out.println(reviewTag.getTag().getName());
//            System.out.println(reviewTag.getReview().getContent());
//        }
//        System.out.println();

//        for (Review review : reviews) {
//            System.out.println(review.getContent());
//            for (ReviewTag reviewTag : review.getReviewTags()) {
//                System.out.println(reviewTag.getTag().getName());
//            }
//        }
    }

    @Override
    public List<ReviewResponseDto> findByCourseTest2(Long courseId) {

        List<Review> reviews = queryFactory.select(review).distinct()
                .from(review)
                .join(review.reviewTags, reviewTag).fetchJoin() //OneToMany
                .join(review.course, course).fetchJoin() //ManyToOne
                .join(review.member, member).fetchJoin()
                .where(review.course.id.eq(courseId))
                .orderBy(review.id.desc())
                .fetch();

        List<Tag> tags = queryFactory.selectFrom(tag)
                .where(tag.category.eq(Category.COURSE))
                .fetch();

        return reviews.stream()
                .map(ReviewResponseDto::from)
                .collect(Collectors.toList());
//        return null;

//        return queryFactory.select(Projections.fields(ReviewResponseDto.class,
//                        review.member.profile,
//                        review.member.nickname,
//                        review.courseRating.as("rating"),
//                        review.content,
//                        review.createdTime))
//                .from(review)
//                .join(review.reviewTags, reviewTag).fetchJoin() //ManyToOne
//                .join(review.course, course)
//                .where(review.course.id.eq(courseId))
//                .fetch();
    }
}
