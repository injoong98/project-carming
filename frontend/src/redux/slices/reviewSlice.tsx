import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CourseReviewRequest, PlaceReviewRequest} from '../../types';

type SliceState = {
  placeReviews: PlaceReviewRequest[];
  courseReview: CourseReviewRequest;
  courseTitle: string;
};

const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState: {
    placeReviews: [],
    courseReview: {
      courseId: undefined,
      name: undefined,
      courseTags: [],
      courseRating: 0,
      content: '',
    },
    courseTitle: '',
  } as SliceState,
  reducers: {
    setplaceReviews: (state, action: PayloadAction<PlaceReviewRequest[]>) => {
      const newReviewList = action.payload;
      state.placeReviews = [...newReviewList];
    },
    updatePlaceReview: (state, action: PayloadAction<PlaceReviewRequest>) => {
      const newReview = action.payload;
      state.placeReviews = state.placeReviews.map(review =>
        review.placeId === newReview.placeId ? newReview : review,
      );
    },
    setCourseReview: (state, action: PayloadAction<CourseReviewRequest>) => {
      const newReview = action.payload;
      state.courseReview = Object.assign(state.courseReview, newReview);
    },
    setCourseTitle: (state, action: PayloadAction<string>) => {
      const newTitle = action.payload;
      state.courseTitle = newTitle;
    },
  },
});

export default reviewSlice;
export const {
  setplaceReviews,
  updatePlaceReview,
  setCourseReview,
  setCourseTitle,
} = reviewSlice.actions;
