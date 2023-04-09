import {createApi} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {ReviewRequest} from '../types';
import customFetchBaseQuery from './customFetchBaseQuery';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: customFetchBaseQuery({baseUrl: REST_API_URL + '/reviews'}),
  tagTypes: ['Reviews'],
  endpoints: builder => ({
    getReviews: builder.query<any[], number>({
      query: courseId => {
        console.log();
        return {
          url: '',
          params: {courseId},
        };
      },
      providesTags: ['Reviews'],
    }),
    registReview: builder.mutation<void, ReviewRequest>({
      query: review => {
        console.log();
        return {
          url: '',
          method: 'POST',
          body: review,
        };
      },
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {useGetReviewsQuery, useRegistReviewMutation} = reviewApi;
