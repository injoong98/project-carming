import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Place} from '../../types';

type SliceState = {placeList: Place[]};

const placeSlice = createSlice({
  name: 'placeSlice',
  initialState: {placeList: []} as SliceState,
  reducers: {
    addPlace: (state, action: PayloadAction<Place>) => {
      const newPlace = action.payload;
      state.placeList = [...state.placeList, newPlace];
    },
    addPlaceList: (state, action: PayloadAction<Place[]>) => {
      const newPlaceList = action.payload;
      state.placeList = [...state.placeList, ...newPlaceList];
    },
    replacePlaceList: (state, action: PayloadAction<Place[]>) => {
      const newPlaceList = action.payload;
      state.placeList = [...newPlaceList];
    },
  },
});

export default placeSlice;
export const {addPlace, addPlaceList, replacePlaceList} = placeSlice.actions;
