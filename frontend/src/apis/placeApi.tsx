import {createApi} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {Category, Place} from '../types';
import customFetchBaseQuery from './customFetchBaseQuery';

export interface PlaceSearch {
  regions: string[];
  category: Category;
  size: number;
}

export const placeApi = createApi({
  reducerPath: 'placeApi',
  baseQuery: customFetchBaseQuery({baseUrl: REST_API_URL + '/places'}),
  tagTypes: ['Places'],
  endpoints: builder => ({
    getPlaces: builder.query<Place[], PlaceSearch>({
      query: filter => ({
        url: '/',
        params: filter,
      }),
      providesTags: ['Places'],
    }),
  }),
});

export const {useGetPlacesQuery} = placeApi;
