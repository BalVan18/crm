import { configureStore } from '@reduxjs/toolkit'
import userModalReducer from './userModalSlice'
import cardModalReducer from './cardModalSlice'
import newTaskModalReducer from './newTaskModalSlice'
import userReducer from './userSlice'
import bdReducer from './bdSlice'
export const store = configureStore({
  reducer: {
    userModal: userModalReducer,
    cardModal: cardModalReducer,
    newTaskModal: newTaskModalReducer,
    user: userReducer,
    bd: bdReducer,
  },
})