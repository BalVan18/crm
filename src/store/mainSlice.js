import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    decrementByAmount: (state, action) => {
        state.value -= action.payload
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount, decrementByAmount } = mainSlice.actions

export default mainSlice.reducer