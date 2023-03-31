import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REACT_APP_API_URL} from '@env';

const apiUrl: string = REACT_APP_API_URL;

export const memberRegistApi = createApi({
  reducerPath: 'memberRegistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/member`,
  }),
  endpoints: builder => ({
    signup: builder.mutation({
      query: member => ({
        url: '/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: member,
      }),
    }),
    verifyStart: builder.mutation({
      query: phone => ({
        url: '/valid-number/request',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: phone,
      }),
    }),
    verify: builder.mutation({
      query: phone => ({
        url: '/valid-number/valid',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: phone,
      }),
    }),
  }),
});

export const {useSignupMutation, useVerifyMutation, useVerifyStartMutation} =
  memberRegistApi;
