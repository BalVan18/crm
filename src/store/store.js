import { configureStore } from '@reduxjs/toolkit'
import userModalReducer from './userModalSlice'
import cardModalReducer from './cardModalSlice'
import newTaskModalReducer from './newTaskModalSlice'
import newStorageItemModalReducer from './newStorageItemModalSlice'
import newWorkModalReducer from './newWorkModalSlice'
import userReducer from './userSlice'
import bdReducer from './bdSlice'
import routerReducer from './routerSlice'

export const store = configureStore({
  reducer: {
    userModal: userModalReducer,
    cardModal: cardModalReducer,
    newTaskModal: newTaskModalReducer,
    newStorageItemModal: newStorageItemModalReducer,
    newWorkModal: newWorkModalReducer,
    user: userReducer,
    bd: bdReducer,
    router: routerReducer,
  },
})