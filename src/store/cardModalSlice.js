import { createSlice } from '@reduxjs/toolkit'

const convertStatusToString = (statusID) => {
  switch (statusID) {
    case 1:
      return 'НЕРАЗОБРАННЫЕ'
    case 2:
      return 'ЗАПИСЬ'
    case 3:
      return 'В РАБОТЕ'
    case 4:
      return 'ВЫПОЛНЕН'
    default:
      break;
  }
}

const initialState = {
    visible: false,
    info: {}
}

export const cardModalSlice = createSlice({
  name: 'cardModal',
  initialState,
  reducers: {
    showCardModal: (state, action) => ({
      visible: !state.visible,
      info: {
        id: action.payload[0],
        client: action.payload[1],
        date: action.payload[2],
        title: action.payload[3],
        author: action.payload[4],
        executor: action.payload[5],
        clientPhone: action.payload[6],
        description: action.payload[7],
        model: action.payload[8],
        number: action.payload[9],
        status: action.payload[10],
        convertedStatus: convertStatusToString(action.payload[10]),
        priority: action.payload[11],
      }
    }),

    closeCardModal: (state) => ({
      visible: !state.visible,
      info: {}
    }),
  },
})

export const { showCardModal, closeCardModal } = cardModalSlice.actions

export default cardModalSlice.reducer