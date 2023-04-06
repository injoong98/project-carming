import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Course, Place, Tag} from '../../types';

type SliceState = {
  courseList: Course[];
  courseCart: Place[];
  courseTagList: Tag[];
  checkedTagList: Tag[];
  coursePage: number;
};

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState: {
    courseList: [],
    courseCart: [],
    courseTagList: [],
    checkedTagList: [],
    coursePage: 1,
  } as SliceState,
  reducers: {
    // Course List
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

    // Course Cart
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

    // Course Tag
    setCourseTagList: (state, action: PayloadAction<Tag[]>) => {
      const newCourseTagList = action.payload;
      state.courseTagList = [...newCourseTagList];
    },
    addCheckedTag: (state, action: PayloadAction<Tag>) => {
      const newTag = action.payload;
      state.checkedTagList = [...state.checkedTagList, newTag];
    },
    deleteCheckedTag: (state, action: PayloadAction<Tag>) => {
      const deletedTag = action.payload;
      const modifiedTagList = state.checkedTagList.filter(
        tag => tag.id !== deletedTag.id,
      );
      state.checkedTagList = [...modifiedTagList];
    },

    // Course Page
    increaseCoursePage: (state, action: PayloadAction<void>) => {
      state.coursePage += 1;
    },
    resetCoursePage: (state, action: PayloadAction<void>) => {
      state.coursePage = 0;
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
  setCourseTagList,
  addCheckedTag,
  deleteCheckedTag,
  increaseCoursePage,
  resetCoursePage,
} = courseSlice.actions;
