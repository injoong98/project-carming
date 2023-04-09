import {createApi} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {Coordinate} from '../types';
import {
  coordinateToRedisPosition,
  redisPositionToCoordinate,
  textToJson,
} from '../utils';
import customFetchBaseQuery from './customFetchBaseQuery';

type RedisPosition = {
  lat: number;
  lon: number;
};

export const journeyApi = createApi({
  reducerPath: 'journeyApi',
  baseQuery: customFetchBaseQuery({baseUrl: REST_API_URL + '/orders'}),
  tagTypes: [
    'currentCarPosition',
    'globalPath',
    'isDestination',
    'driveStartStatus',
  ],
  endpoints: builder => ({
    // Queries
    getCurrentCarPosition: builder.query<Coordinate, void>({
      query: () => ({
        url: '?key=current_position',
        responseHandler: res => res.text(),
      }),
      transformResponse: (res: string) => {
        const pos: RedisPosition = JSON.parse(textToJson(res));
        return redisPositionToCoordinate(pos);
      },
      providesTags: ['currentCarPosition'],
    }),
    getGlobalPath: builder.query<Coordinate[], void>({
      query: () => ({
        url: '?key=global_path',
        responseHandler: res => res.text(),
      }),
      transformResponse: (res: string) =>
        JSON.parse(textToJson(res)).map((pos: RedisPosition) =>
          redisPositionToCoordinate(pos),
        ),
      providesTags: ['globalPath'],
    }),
    checkIsDestination: builder.query<boolean, void>({
      query: () => ({
        url: '?key=is_destination',
        responseHandler: res => res.text(),
      }),
      transformResponse: (res: string) => res === '1',
      providesTags: ['isDestination'],
    }),
    checkDriveStartStatus: builder.query<boolean, void>({
      query: () => ({
        url: '?key=get_in',
        responseHandler: res => res.text(),
      }),
      transformResponse: (res: string) => res === '1',
      providesTags: ['driveStartStatus'],
    }),

    // Mutations
    setDestinationCoordinate: builder.mutation<void, Coordinate>({
      query: coordinate => {
        console.log();
        return {
          url: '',
          method: 'POST',
          body: {
            key: 'destination_coordinate',
            value: JSON.stringify(coordinateToRedisPosition(coordinate)),
          },
        };
      },
    }),
    setGetOffStatus: builder.mutation<void, number>({
      query: status => {
        console.log();
        return {
          url: '',
          method: 'POST',
          body: {
            key: 'get_off',
            value: status,
          },
        };
      },
    }),
    setDriveStartStatus: builder.mutation<void, number>({
      query: status => {
        console.log();
        return {
          url: '',
          method: 'POST',
          body: {
            key: 'get_in',
            value: status,
          },
        };
      },
      invalidatesTags: ['driveStartStatus'],
    }),
    setIsDestination: builder.mutation<void, number>({
      query: status => {
        console.log();
        return {
          url: '',
          method: 'POST',
          body: {
            key: 'is_destination',
            value: status,
          },
        };
      },
      invalidatesTags: ['isDestination'],
    }),
    setTourStart: builder.mutation<void, number>({
      query: status => {
        console.log();
        return {
          url: '',
          method: 'POST',
          body: {
            key: 'tour_start',
            value: status,
          },
        };
      },
    }),
  }),
});

export const {
  useCheckIsDestinationQuery,
  useGetCurrentCarPositionQuery,
  useGetGlobalPathQuery,
  useSetDestinationCoordinateMutation,
  useSetDriveStartStatusMutation,
  useSetGetOffStatusMutation,
  useSetIsDestinationMutation,
  useCheckDriveStartStatusQuery,
  useSetTourStartMutation,
} = journeyApi;
