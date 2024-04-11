import { configureStore } from '@reduxjs/toolkit'
import userModalSliceReducer from './userModalSlice'
import cardModalSliceReducer from './cardModalSlice'

export const store = configureStore({
  reducer: {
    userModal: userModalSliceReducer,
    cardModal: cardModalSliceReducer,
  },
})