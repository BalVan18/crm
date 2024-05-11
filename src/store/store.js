import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalSlice'
import userReducer from './userSlice'
import bdReducer from './bdSlice'
import routerReducer from './routerSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    bd: bdReducer,
    router: routerReducer,
  },
})