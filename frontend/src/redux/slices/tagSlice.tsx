import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Tag} from '../../types';

type SliceState = {
  tagList: Tag[];
};

const tagSlice = createSlice({
  name: 'tagSlice',
  initialState: {
    tagList: [],
  } as SliceState,
  reducers: {
    setTagList: (state, action: PayloadAction<Tag[]>) => {
      const newTagList = action.payload;
      state.tagList = [...newTagList];
    },
  },
});

export default tagSlice;
export const {setTagList} = tagSlice.actions;
