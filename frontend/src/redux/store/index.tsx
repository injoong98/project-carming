import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import persistConfig from './persistConfig';
import {
  placeSlice,
  courseSlice,
  tagSlice,
  authSlice,
  journeySlice,
  mainSlice,
} from '../slices';
import {
  memberRegistApi,
  placeApi,
  courseApi,
  journeyApi,
  tagApi,
} from './../../apis';

const rootReducer = combineReducers({
  place: placeSlice.reducer,
  course: courseSlice.reducer,
  tag: tagSlice.reducer,
  auth: authSlice.reducer,
  main: mainSlice.reducer,
  journey: journeySlice.reducer,
  [memberRegistApi.reducerPath]: memberRegistApi.reducer,
  [placeApi.reducerPath]: placeApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [journeyApi.reducerPath]: journeyApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({serializableCheck: false}).concat(
    memberRegistApi.middleware,
    placeApi.middleware,
    courseApi.middleware,
    journeyApi.middleware,
    tagApi.middleware,
  ), // redux toolkit과 redux persist를 함께 사용하여 발생하는 에러 해결
  // RTK query를 사용하기 위해 api 를 생성하고 middleware 추가
});
const persistor = persistStore(store);

export {store, persistor};
export type ReducersState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
