import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false
}

export const newTaskModalSlice = createSlice({
  name: 'newTaskModal',
  initialState,
  reducers: {
    showNewTaskModal: (state) => ({visible: !state.visible}),
    closeNewTaskModal: (state) => ({visible: !state.visible})
  },
})

export const { showNewTaskModal, closeNewTaskModal } = newTaskModalSlice.actions

export default newTaskModalSlice.reducer