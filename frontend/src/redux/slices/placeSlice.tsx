import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category, Place, Tag} from '../../types';

type SliceState = {
  placeList: Place[];
  placeCart: Place[];
  placeTagList: Tag[];
  checkedTagList: Tag[];
  selectedCategory: Category;
};

const placeSlice = createSlice({
  name: 'placeSlice',
  initialState: {
    placeList: [],
    placeCart: [],
    placeTagList: [],
    checkedTagList: [],
    selectedCategory: Category.음식점,
  } as SliceState,
  reducers: {
    // Place List
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

    // Place Cart
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
    setPlaceCart: (state, action: PayloadAction<Place[]>) => {
      const preCart = action.payload;
      state.placeCart = [...preCart];
    },

    // Place Tag
    setPlaceTagList: (state, action: PayloadAction<Tag[]>) => {
      const newPlaceTagList = action.payload;
      state.placeTagList = [...newPlaceTagList];
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

    // Category
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
  setPlaceTagList,
  addCheckedTag,
  deleteCheckedTag,
  setPlaceCart,
} = placeSlice.actions;
