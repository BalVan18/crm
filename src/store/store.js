import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalSlice'
import newStorageItemModalReducer from './newStorageItemModalSlice'
import newWorkModalReducer from './newWorkModalSlice'
import userReducer from './userSlice'
import bdReducer from './bdSlice'
import routerReducer from './routerSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    newStorageItemModal: newStorageItemModalReducer,
    newWorkModal: newWorkModalReducer,
    user: userReducer,
    bd: bdReducer,
    router: routerReducer,
  },
})