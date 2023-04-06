import {createApi} from '@reduxjs/toolkit/query/react';
import {REST_API_URL} from '@env';
import {Category, Place} from '../types';
import customFetchBaseQuery from './customFetchBaseQuery';
import {SelectedPopularPlaceResponse} from '../types/MainResponse';

export interface PlaceSearch {
  regions: string[];
  category: Category;
  size: number;
  page: number;
  tagId?: number;
}

export const placeApi = createApi({
  reducerPath: 'placeApi',
  baseQuery: customFetchBaseQuery({baseUrl: REST_API_URL + '/places'}),
  tagTypes: ['Places', 'PopularPlaces', 'SelectedPopularPlace'],
  endpoints: builder => ({
    getPlaces: builder.query<Place[], PlaceSearch>({
      query: filter => ({
        url: '/',
        params: filter,
      }),
      serializeQueryArgs: endpointName => {
        const {category, tagId, regions} = endpointName.queryArgs;
        const key = `${regions}${category}${tagId}`;
        return key;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch: ({currentArg, previousArg}) => {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ['Places'],
    }),
    getPopularPlaces: builder.query<Place[], void>({
      query: () => {
        console.log(REST_API_URL);
        return {
          url: '/popular',
        };
      },
      providesTags: ['PopularPlaces'],
    }),
    //id의 타입을 number로 지정
    getSelectedPopularPlace: builder.query<
      SelectedPopularPlaceResponse[],
      number
    >({
      query: id => {
        console.log(id);
        return {
          url: `/popular/${id}`, // id를 URL에 추가
        };
      },
      providesTags: (result, error, id) => [
        // 쿼리 결과에 id를 추가해서 Tag 지정
        ...(result?.map(({id: placeId}) => ({
          type: 'SelectedPopularPlace' as const,
          id: placeId,
        })) ?? []),
        {type: 'SelectedPopularPlace' as const, id},
      ],
    }),
  }),
});

export const {
  useGetPlacesQuery,
  useGetPopularPlacesQuery,
  useGetSelectedPopularPlaceQuery,
} = placeApi;
