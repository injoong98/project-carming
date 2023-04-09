import {createApi} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import customFetchBaseQuery from './customFetchBaseQuery';

const API_URL: string = REST_API_URL;

export const memberRegistApi = createApi({
  reducerPath: 'memberRegistApi',
  baseQuery: customFetchBaseQuery({
    baseUrl: `${API_URL}/member`,
  }),
  endpoints: builder => ({
    signup: builder.mutation({
      query: member => {
        console.log();
        return {
          url: '/signup',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: member,
        };
      },
    }),
    verifyStart: builder.mutation({
      query: phone => {
        console.log();
        return {
          url: '/valid-number/request',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: phone,
        };
      },
    }),
    verify: builder.mutation({
      query: phone => {
        console.log();
        return {
          url: '/valid-number/valid',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: phone,
        };
      },
    }),
  }),
});

export const {useSignupMutation, useVerifyMutation, useVerifyStartMutation} =
  memberRegistApi;
