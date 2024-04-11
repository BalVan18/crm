import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false
}

export const userModalSlice = createSlice({
  name: 'userModal',
  initialState,
  reducers: {
    showUserModal: (state) => {
      state.visible = true
    },
    closeUserModal: (state) => {
      state.visible = false
    },
  },
})

export const { showUserModal, closeUserModal } = userModalSlice.actions

export default userModalSlice.reducer