import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setRouterData: (state, action) => action.payload
  },
})

export const { setRouterData } = routerSlice.actions

export default routerSlice.reducer