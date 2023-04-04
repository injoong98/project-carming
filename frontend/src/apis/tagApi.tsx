import {createApi} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {TagSliceState} from '../redux/slices/tagSlice';
import customFetchBaseQuery from './customFetchBaseQuery';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: customFetchBaseQuery({baseUrl: REST_API_URL + '/tags'}),
  tagTypes: ['Tags'],
  endpoints: builder => ({
    getTags: builder.query<TagSliceState, void>({
      query: () => '',
      providesTags: ['Tags'],
    }),
  }),
});

export const {useGetTagsQuery} = tagApi;
