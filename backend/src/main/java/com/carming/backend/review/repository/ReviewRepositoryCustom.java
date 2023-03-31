package com.carming.backend.review.repository;

import com.carming.backend.review.domain.Review;
import com.carming.backend.review.dto.response.ReviewResponseDto;

import java.util.List;

public interface ReviewRepositoryCustom {

    List<ReviewResponseDto> findByCourseTest2(Long courseId);

    List<Review> findByCourseTest1(Long courseId);
}
