import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false
}

export const userModalSlice = createSlice({
  name: 'userModal',
  initialState,
  reducers: {
    showUserModal: (state) => ({visible: !state.visible}),
    closeUserModal: (state) => ({visible: !state.visible})
  },
})

export const { showUserModal, closeUserModal } = userModalSlice.actions

export default userModalSlice.reducer