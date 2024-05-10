import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false
}

export const newStorageItemModalSlice = createSlice({
  name: 'newStorageItemModal',
  initialState,
  reducers: {
    showNewStorageItemModal: (state) => ({visible: !state.visible}),
    closeNewStorageItemModal: (state) => ({visible: !state.visible})
  },
})

export const { showNewStorageItemModal, closeNewStorageItemModal } = newStorageItemModalSlice.actions

export default newStorageItemModalSlice.reducer