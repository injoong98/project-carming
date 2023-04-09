import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customFetchBaseQuery = (option: {baseUrl: string}) =>
  fetchBaseQuery({
    prepareHeaders: async headers => {
      const value = await AsyncStorage.getItem('persist:carming');
      if (value) {
        const {token} = JSON.parse(JSON.parse(value).auth);
        headers.set('Authorization', token);
      }
      return headers;
    },
    ...option,
  });

export default customFetchBaseQuery;
