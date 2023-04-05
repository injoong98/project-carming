import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Course, Place, RegionObject, Review} from '../../types';
import {SeoulDistrict} from '../../types/SeoulDistrict';
import {
  SelectedPopularCourseResponse,
  SelectedPopularPlaceResponse,
} from '../../types/MainResponse';

type MainState = {
  regionList: SeoulDistrict[];
  preCart: Place[];
  selectedPlace?: Place | null;
  selectedPopularPlace?: SelectedPopularPlaceResponse | null;
  selectedCourse?: Course | null;
  selectedPopularCourse?: SelectedPopularCourseResponse | null;
  selectedPopularCourseReviews: Review[];
};

const initialState: MainState = {
  //메인 맵에서 선택된 지역구들
  regionList: [],
  //추천 장소 및 코스를 통해 선택된 장소들
  preCart: [],
  //메인 화면에서 추천 컴포넌트들을 클릭해 모달을 띄울 때 선택된 요소
  selectedPlace: undefined,
  selectedPopularPlace: {
    id: 0,
    name: '',
    image: '',
    region: '',
    address: '',
    ratingSum: 0,
    ratingCount: 0,
    tags: [{tagName: '', tagCount: 0}],
    tel: '',
  },
  selectedCourse: undefined,
  selectedPopularCourse: {
    name: '',
    ratingCount: 0,
    ratingSum: 0,
    regions: [],
    places: [],
  },
  selectedPopularCourseReviews: [],
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
      state.selectedCourse = null;
      state.selectedPopularCourse = null;
      state.selectedPopularCourseReviews = [];
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
      state.preCart = state.preCart.filter(place => place.id !== newPlace.id);
      state.preCart = [...state.preCart, newPlace];
    },
    addPlaceListToPreCart: (state, action: PayloadAction<Place[]>) => {
      const newPlaceList = action.payload;
      const preCartIdList: number[] = [];
      state.preCart.map(place => {
        preCartIdList.push(place.id);
      });
      // 이미 추가되어 있는 장소를 제외하고 삽입
      state.preCart = [
        ...state.preCart,
        ...newPlaceList.filter(place => !preCartIdList.includes(place.id)),
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

    // Popular Place
    addSelectedPlaceInstance: (
      state,
      action: PayloadAction<SelectedPopularPlaceResponse>,
    ) => {
      const newPlace = action.payload;
      state.selectedPopularPlace = newPlace;
    },

    // Popular Course
    addSelectedCoursesInstance: (
      state,
      action: PayloadAction<SelectedPopularCourseResponse>,
    ) => {
      const newCourse = action.payload;
      state.selectedPopularCourse = newCourse;
    },
    addSelectedCoursesInstanceReviews: (
      state,
      action: PayloadAction<Review[]>,
    ) => {
      const reviews = action.payload;
      state.selectedPopularCourseReviews = reviews;
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
  addSelectedPlaceInstance,
  addSelectedCoursesInstance,
  addSelectedCoursesInstanceReviews,
} = mainSlice.actions;
