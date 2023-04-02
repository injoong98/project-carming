import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {Course} from '../types';

export interface CourseSearch {
  regions: string[];
  size: number;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({baseUrl: REST_API_URL + '/courses'}),
  tagTypes: ['Courses'],
  endpoints: builder => ({
    getCourses: builder.query<Course[], CourseSearch>({
      query: filter => ({
        url: '/',
        params: filter,
      }),
      providesTags: ['Courses'],
    }),
  }),
});

export const {useGetCoursesQuery} = courseApi;
