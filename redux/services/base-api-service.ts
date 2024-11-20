import { NewsDataType } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://newsdata.io/api/1/news', // Keep only the base URL here
    }),
    endpoints: (builder) => ({
        getAllNews: builder.query<any, void>({
            query: () => ({
                url: '/',
                method: 'GET',
                params: {
                    apikey: process.env.EXPO_PUBLIC_API_KEY,
                    country: 'in',
                    language: 'en',
                },
            }),

        }),
    }),
});

export const { useGetAllNewsQuery } = api;
