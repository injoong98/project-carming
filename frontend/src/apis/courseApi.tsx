import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {Course} from '../types';

export interface CourseSearch {
  regions: string[];
  size: number;
}

interface CheckCourseResponse {
  courseId: number;
  newCourse: boolean;
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
    checkCourseExist: builder.query<CheckCourseResponse, number[]>({
      query: placeKeys => ({
        url: '/new',
        params: {placeKeys},
      }),
    }),

    registCourse: builder.mutation<number, Course>({
      query: course => ({
        url: '',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Courses'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCheckCourseExistQuery,
  useRegistCourseMutation,
} = courseApi;
