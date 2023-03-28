import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import persistConfig from './persistConfig';
import {placeSlice, courseSlice, tagSlice, authSlice} from '../slices';

const rootReducer = combineReducers({
  place: placeSlice.reducer,
  course: courseSlice.reducer,
  tag: tagSlice.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({serializableCheck: false}), // redux toolkit과 redux persist를 함께 사용하여 발생하는 에러 해결
});
const persistor = persistStore(store);

export {store, persistor};
export type ReducersState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
