import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface MusicState {
  token: string | null,
  username: string | null,
  error: string | null,
  globalIsError: boolean
}

const initialState: MusicState = {
  token: null,
  username: null,
  error: null,
  globalIsError: false
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setGlobalIsError(state, action: PayloadAction<boolean>) {
      state.globalIsError = action.payload
    },
    setUsername(state, action: PayloadAction<string | null>) {
      state.username = action.payload
    }
  }
})

export default musicSlice.reducer