import { configureStore } from '@reduxjs/toolkit'
import userModalReducer from './userModalSlice'
import cardModalReducer from './cardModalSlice'
import newTaskModalReducer from './newTaskModalSlice'

export const store = configureStore({
  reducer: {
    userModal: userModalReducer,
    cardModal: cardModalReducer,
    newTaskModal: newTaskModalReducer,
  },
})