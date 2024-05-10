import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false
}

export const newWorkModalSlice = createSlice({
  name: 'newWorkModal',
  initialState,
  reducers: {
    showNewWorkModal: (state) => ({visible: !state.visible}),
    closeNewWorkModal: (state) => ({visible: !state.visible})
  },
})

export const { showNewWorkModal, closeNewWorkModal } = newWorkModalSlice.actions

export default newWorkModalSlice.reducer