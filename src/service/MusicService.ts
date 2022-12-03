import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

export const musicAPI = createApi({
  reducerPath: 'socialAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Sub'],
  endpoints: (build) => ({

  })
})
