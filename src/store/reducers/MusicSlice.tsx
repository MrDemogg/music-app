import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface MusicState {
  token: string | null,
  error: boolean
}

const initialState: MusicState = {
  token: null,
  error: false,
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload
    }
  }
})

export default musicSlice.reducer