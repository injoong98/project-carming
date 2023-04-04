import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReducersState} from '.';
import {PersistConfig} from 'redux-persist';

const persistConfig: PersistConfig<ReducersState> = {
  key: 'carming',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

export default persistConfig;
