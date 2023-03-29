import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REACT_APP_API_URL} from '@env';

const apiUrl: string = REACT_APP_API_URL;

export const memberRegistApi = createApi({
  reducerPath: 'memberRegistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
  }),
  endpoints: builder => ({
    signup: builder.mutation({
      query: member => ({
        url: '/member/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: member,
      }),
    }),
  }),
});

export const {useSignupMutation} = memberRegistApi;
