import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_RTK_URL }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getRTKitems: builder.query({
      query: () => '/items',
      transformResponse: (res: any) => res.sort((a: any, b: any) => b.id - a.id),
      providesTags: ['Items']
    })
  })
})

export const {
  useGetRTKitemsQuery,
} = apiSlice
