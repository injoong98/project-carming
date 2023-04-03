import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {ReviewRequest} from '../types';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({baseUrl: REST_API_URL + '/reviews'}),
  tagTypes: ['Reviews'],
  endpoints: builder => ({
    getReviews: builder.query<any[], number>({
      query: courseId => ({
        url: '',
        params: {courseId},
      }),
      providesTags: ['Reviews'],
    }),
    registReview: builder.mutation<void, ReviewRequest>({
      query: review => ({
        url: '',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {useGetReviewsQuery, useRegistReviewMutation} = reviewApi;
