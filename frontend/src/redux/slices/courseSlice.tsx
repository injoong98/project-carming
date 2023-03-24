import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Course, Place} from '../../types';

type SliceState = {
  courseList: Course[];
  courseCart: Place[];
};

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState: {
    courseList: [],
    courseCart: [],
  } as SliceState,
  reducers: {
    addCourseToCourseList: (state, action: PayloadAction<Course>) => {
      const newCourse = action.payload;
      state.courseList = [...state.courseList, newCourse];
    },
    addCoursesToCourseList: (state, action: PayloadAction<Course[]>) => {
      const newCourseList = action.payload;
      state.courseList = [...state.courseList, ...newCourseList];
    },
    setCourseList: (state, action: PayloadAction<Course[]>) => {
      const newCourseList = action.payload;
      state.courseList = [...newCourseList];
    },
    setCourseToCourseCart: (state, action: PayloadAction<Course>) => {
      const newCourse = action.payload;
      state.courseCart = [...newCourse.places];
    },
    deletePlaceFromCourseCartById: (state, action: PayloadAction<number>) => {
      const placeId = action.payload;
      const modifiedCart = state.courseCart.filter(
        place => place.id !== placeId,
      );
      state.courseCart = [...modifiedCart];
    },
  },
});

export default courseSlice;
export const {
  addCourseToCourseList,
  addCoursesToCourseList,
  setCourseList,
  setCourseToCourseCart,
  deletePlaceFromCourseCartById,
} = courseSlice.actions;
