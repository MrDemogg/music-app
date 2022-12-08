import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IArtists} from "../models/IArtists";
import {IAlbums} from "../models/IAlbums";
import {ITracks} from "../models/ITracks";
import {IRegister} from "../models/IRegister";
import {ILogin} from "../models/ILogin";
import {ITrackHistory} from "../models/ITrackHistory";

export const musicAPI = createApi({
  reducerPath: 'musicAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Artists', 'Albums', 'Tracks'],
  endpoints: (build) => ({
    fetchArtists: build.query<IArtists[], undefined>({
      query: arg => ({
        url: '/artists',
        method: 'GET'
      }),
      providesTags: result => ['Artists']
    }),
    fetchAlbums: build.query<IAlbums[], IAlbums>({
      query: arg => ({
        url: arg.albumId ? `/albums/${arg.albumId}` : '/albums',
        method: 'GET',
        params: {
          artist: arg.artistFilterName
        }
      }),
      providesTags: result => ['Albums']
    }),
    fetchTracks: build.query<ITracks[], ITracks>({
      query: arg => ({
        url: '/tracks',
        method: 'GET',
        params: {
          album: arg.albumFilterName
        }
      }),
      providesTags: result => ['Tracks']
    }),
    register: build.mutation<string, IRegister>({
      query: arg => ({
        url: '/users',
        method: 'POST',
        body: arg
      })
    }),
    login: build.mutation<ILogin, ILogin>({
      query: arg => ({
        url: '/users/sessions',
        method: 'POST',
        body: arg
      })
    }),
    postTrackHistory: build.mutation<string, ITrackHistory>({
      query: arg => ({
        url: '/track_history',
        method: 'POST',
        headers: {
          'Token': arg.token
        },
        body: {
          track: arg.track
        },
        responseHandler: response => response.text()
      })
    })
  })
})
