import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Course, Place, RegionObject} from '../../types';
import {SeoulDistrict} from '../../types/SeoulDistrict';

type MainState = {
  regionList: SeoulDistrict[];
  preCart: Place[];
  selectedPlace?: Place | null;
  selectedCourse?: Course | null;
};

const initialState: MainState = {
  //메인 맵에서 선택된 지역구들
  regionList: [],
  //추천 장소 및 코스를 통해 선택된 장소들
  preCart: [],
  //메인 화면에서 추천 컴포넌트들을 클릭해 모달을 띄울 때 선택된 요소
  selectedPlace: null,
  selectedCourse: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    //mainScreen에서 데이터 초기화
    initializeMainState: state => {
      state.regionList = [];
      state.preCart = [];
      state.selectedPlace = null;
      state.selectedCourse = null;
    },

    //regionList
    addRegionToRegionList: (state, action: PayloadAction<SeoulDistrict>) => {
      const newRegion = action.payload;
      // regionList에 구 추가
      if (!state.regionList.includes(newRegion)) {
        state.regionList = [...state.regionList, newRegion];
      }
    },
    removeRegionFromRegionList: (
      state,
      action: PayloadAction<SeoulDistrict>,
    ) => {
      const regionToRemove = action.payload;
      state.regionList = state.regionList.filter(
        region => region !== regionToRemove,
      );
    },

    //preCart
    addPlaceToPreCart: (state, action: PayloadAction<Place>) => {
      const newPlace = action.payload;
      // 이미 추가된 장소인지 검사
      // if (!state.preCart.includes(newPlace)) {
      //   state.preCart.push(newPlace);
      // }
      state.preCart = state.preCart.filter(place => place.id !== newPlace.id);
      state.preCart = [...state.preCart, newPlace];
    },
    addPlaceListToPreCart: (state, action: PayloadAction<Place[]>) => {
      const newPlaceList = action.payload;
      // 이미 추가되어 있는 장소를 제외하고 삽입
      state.preCart = [
        ...state.preCart,
        ...newPlaceList.filter(place => !state.preCart.includes(place)),
      ];
    },
    removePlaceFromPreCart: (state, action: PayloadAction<Place>) => {
      // state.preCart = state.preCart.filter(place => place !== action.payload);
      const placeId = action.payload.id;
      const modifiedCart = state.preCart.filter(place => place.id !== placeId);
      state.preCart = [...modifiedCart];
    },

    //selectedPlace
    addSelectedPlace: (state, action: PayloadAction<Place>) => {
      const selPlace = action.payload;
      state.selectedPlace = selPlace;
    },
    initializeSelectedPlace: state => {
      state.selectedPlace = null;
    },

    //selectedCourse
    addSelectedCourse: (state, action: PayloadAction<Course>) => {
      const selCourse = action.payload;
      state.selectedCourse = selCourse;
    },
    initializeSelectedCourse: state => {
      state.selectedCourse = null;
    },
  },
});

export default mainSlice;

export const {
  initializeMainState,
  addRegionToRegionList,
  removeRegionFromRegionList,
  addPlaceToPreCart,
  addPlaceListToPreCart,
  removePlaceFromPreCart,
  addSelectedPlace,
  initializeSelectedPlace,
  addSelectedCourse,
  initializeSelectedCourse,
} = mainSlice.actions;
