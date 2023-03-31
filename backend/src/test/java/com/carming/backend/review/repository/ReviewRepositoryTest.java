package com.carming.backend.review.repository;

import com.carming.backend.TestConfig;
import com.carming.backend.course.domain.Course;
import com.carming.backend.course.repository.CourseRepository;
import com.carming.backend.review.domain.Review;
import com.carming.backend.review.domain.ReviewTag;
import com.carming.backend.tag.domain.Category;
import com.carming.backend.tag.domain.Tag;
import com.carming.backend.tag.repository.TagRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@DataJpaTest
@Import(TestConfig.class)
class ReviewRepositoryTest {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewTagRepository reviewTagRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    CourseRepository courseRepository;

    @Test
    @DisplayName("코스 별 리뷰 및 해당 태그 가져오기")
    void getReviewsByCourse() {
        //given
        saveReviewTag();

        reviewRepository.findByCourseTest1(1L);

    }


    private List<Tag> saveTags() {
        List<Tag> tags = new ArrayList<>();
        tags.add(tagRepository.save(new Tag("맛있는", Category.CAFE)));
        tags.add(tagRepository.save(new Tag("청결한", Category.CAFE)));
        tags.add(tagRepository.save(new Tag("특별한 메뉴", Category.CAFE)));
        tags.add(tagRepository.save(new Tag("세련된", Category.CAFE)));
        tags.add(tagRepository.save(new Tag("맛있는", Category.FOOD)));
        tags.add(tagRepository.save(new Tag("청결한", Category.FOOD)));
        tags.add(tagRepository.save(new Tag("양이 많은", Category.FOOD)));
        tags.add(tagRepository.save(new Tag("친절한", Category.FOOD)));
        return tags;
    }

    private void saveReviewTag() {
        Random random = new Random();

        List<Review> reviews = saveReview();
        List<Tag> tags = saveTags();
        for (Review review : reviews) {
            reviewTagRepository.save(new ReviewTag(review, tags.get(random.nextInt(4))));

            reviewTagRepository.save(new ReviewTag(review, tags.get(random.nextInt(4))));
        }
    }

    private List<Review> saveReview() {
        List<Course> courses = saveCourse();
        List<Review> reviews = new ArrayList<>();
        mappingCourse(new Review(4, "꽤 재미있는 듯?"), courses.get(0), reviews);
        mappingCourse(new Review(3, "그닥"), courses.get(0), reviews);
        mappingCourse(new Review(2, "별로"), courses.get(0), reviews);
        mappingCourse(new Review(1, "별로인듯 가지마쇼"), courses.get(1), reviews);
        mappingCourse(new Review(2, "낫배드"), courses.get(1), reviews);
        mappingCourse(new Review(3, "평타치"), courses.get(1), reviews);
        mappingCourse(new Review(4, "괜찮은데?"), courses.get(1), reviews);
        reviewRepository.saveAll(reviews);
        return reviews;
    }

    private void mappingCourse(Review review, Course course, List<Review> reviews) {
        review.changeCourse(course);
        reviews.add(review);
    }

    private List<Course> saveCourse() {
        Course course1 = courseRepository.save(new Course("1|2|3|4|5", "노원구|은평구|관악구", "노잼은 아닌 코스"));
        Course course2 = courseRepository.save(new Course("1|4|5|10|7", "서대문구|은평구|관악구", "평타코스"));

        return List.of(course1, course2);
    }

}