import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Tag} from '../../types';

type SliceState = {
  cafeTags: Tag[];
  foodTags: Tag[];
  playTags: Tag[];
  attractionTags: Tag[];
  sleepTags: Tag[];
  courseTags: Tag[];
};

const tagSlice = createSlice({
  name: 'tagSlice',
  initialState: {
    cafeTags: [],
    foodTags: [],
    playTags: [],
    attractionTags: [],
    sleepTags: [],
    courseTags: [],
  } as SliceState,
  reducers: {
    setTagList: (state, action: PayloadAction<SliceState>) => {
      const newTagList = action.payload;
      state = Object.assign(state, newTagList);
    },
  },
});

export default tagSlice;
export const {setTagList} = tagSlice.actions;
export type {SliceState as TagSliceState};
