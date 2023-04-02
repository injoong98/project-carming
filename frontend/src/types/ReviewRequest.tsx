export type ReviewRequest = {
  placeReviews: PlaceReviewRequest[];
  courseReview: CourseReviewRequest;
};

export type PlaceReviewRequest = {
  placeId: number;
  placeTags: number[];
  placeRating: number;
};

export type CourseReviewRequest = {
  courseId: number;
  courseTags: number[];
  courseRating: number;
  content: string;
};
