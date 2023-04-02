import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {TagSliceState} from '../redux/slices/tagSlice';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({baseUrl: REST_API_URL + '/tags'}),
  tagTypes: ['Tags'],
  endpoints: builder => ({
    getTags: builder.query<TagSliceState, void>({
      query: () => '',
      providesTags: ['Tags'],
    }),
  }),
});

export const {useGetTagsQuery} = tagApi;
