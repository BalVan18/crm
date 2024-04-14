import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    visible: false,
    info: {
      id: null,
      client: '',
      date: '',
      title: '',
      author: '',
      executor: '',
      clientPhone: '',
      description: '',
      model: '',
      number: '',
      status: null,
    }
  }
]

export const cardModalSlice = createSlice({
  name: 'cardModal',
  initialState,
  reducers: {
    showCardModal: (state, action) => {
      return [{ visible: true, info: {id: action.payload[0], client: action.payload[1], date: action.payload[2], title: action.payload[3], author: action.payload[4], executor: action.payload[5], clientPhone: action.payload[6], description: action.payload[7], model: action.payload[8], number: action.payload[9], status: action.payload[10]}}]
    },
    closeCardModal: (state) => {
      return [{ visible: false, info: {id: null, client: '', date: '', title: '', author: '', executor: '', clientPhone: '', description: '', model: '', nubmer: '', status: null}}]
    }
  },
})

export const { showCardModal, closeCardModal } = cardModalSlice.actions

export default cardModalSlice.reducer