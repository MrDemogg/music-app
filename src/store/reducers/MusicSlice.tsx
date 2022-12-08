import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface MusicState {
  token: string,
  error: string | null,
  globalIsError: boolean
}

const initialState: MusicState = {
  token: '',
  error: null,
  globalIsError: false
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setGlobalIsError(state, action: PayloadAction<boolean>) {
      state.globalIsError = action.payload
    }
  }
})

export default musicSlice.reducer