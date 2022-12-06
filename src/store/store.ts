import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {musicAPI} from "../service/MusicService";
import musicReducer from './reducers/MusicSlice'

const rootReducer = combineReducers({
  musicReducer,
  [musicAPI.reducerPath]: musicAPI.reducer
})

export const setupStore = (): any => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(musicAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']