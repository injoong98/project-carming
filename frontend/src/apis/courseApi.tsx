import {createApi} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {Course, Tag, Review} from '../types';
import customFetchBaseQuery from './customFetchBaseQuery';

export interface CourseSearch {
  regions: string[];
  size: number;
  page: number;
  tags?: Tag[];
}

interface CheckCourseResponse {
  courseId: number;
  newCourse: boolean;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: customFetchBaseQuery({
    baseUrl: REST_API_URL + '/courses',
  }),
  tagTypes: ['Courses'],
  endpoints: builder => ({
    getCourses: builder.query<Course[], CourseSearch>({
      query: filter => ({
        url: '/',
        params: filter,
      }),
      serializeQueryArgs: endpointName => {
        const {regions, tags} = endpointName.queryArgs;
        const key = `${regions}${tags}`;
        return key;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch: ({currentArg, previousArg}) => {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ['Courses'],
    }),
    getPopularCourses: builder.query<Course[], number>({
      query: size => ({
        url: '/',
        params: {size},
      }),
      providesTags: ['Courses'],
    }),
    getSelectedPopularCourseReviews: builder.query<Review, number>({
      query: id => ({
        url: `/${id}/reviews`,
      }),
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
  useGetPopularCoursesQuery,
} = courseApi;
