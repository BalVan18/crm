import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false
}

export const cardModalSlice = createSlice({
  name: 'cardModal',
  initialState,
  reducers: {
    showCardModal: (state) => {
      state.visible = true
    },
    closeCardModal: (state) => {
      state.visible = false
    },
  },
})

export const { showCardModal, closeCardModal } = cardModalSlice.actions

export default cardModalSlice.reducer