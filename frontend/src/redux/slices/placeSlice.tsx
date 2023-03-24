import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category, Place} from '../../types';

type SliceState = {
  placeList: Place[];
  placeCart: Place[];
  selectedCategory: Category;
};

const placeSlice = createSlice({
  name: 'placeSlice',
  initialState: {
    placeList: [],
    placeCart: [],
    selectedCategory: Category.음식점,
  } as SliceState,
  reducers: {
    addPlaceToPlaceList: (state, action: PayloadAction<Place>) => {
      const newPlace = action.payload;
      state.placeList = [...state.placeList, newPlace];
    },
    addPlacesToPlaceList: (state, action: PayloadAction<Place[]>) => {
      const newPlaceList = action.payload;
      state.placeList = [...state.placeList, ...newPlaceList];
    },
    setPlaceList: (state, action: PayloadAction<Place[]>) => {
      const newPlaceList = action.payload;
      state.placeList = [...newPlaceList];
    },
    addPlaceToPlaceCart: (state, action: PayloadAction<Place>) => {
      const newPlace = action.payload;
      state.placeCart = state.placeCart.filter(
        place => place.id !== newPlace.id,
      );
      state.placeCart = [...state.placeCart, newPlace];
    },
    deletePlaceFromPlaceCartById: (state, action: PayloadAction<number>) => {
      const placeId = action.payload;
      const modifiedCart = state.placeCart.filter(
        place => place.id !== placeId,
      );
      state.placeCart = [...modifiedCart];
    },
    selectCategory: (state, action: PayloadAction<Category>) => {
      const newCategory = action.payload;
      state.selectedCategory = newCategory;
    },
  },
});

export default placeSlice;
export const {
  addPlaceToPlaceList,
  addPlacesToPlaceList,
  setPlaceList,
  addPlaceToPlaceCart,
  deletePlaceFromPlaceCartById,
  selectCategory,
} = placeSlice.actions;
