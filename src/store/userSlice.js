import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => action.payload
  },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer