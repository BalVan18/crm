import { createSlice } from '@reduxjs/toolkit'

const convertStatusToString = (statusID) => {
  switch (statusID) {
    case 1:
      return 'НЕРАЗОБРАННЫЕ'
    case 2:
      return 'В РАБОТЕ'
    case 3:
      return 'ВЫПОЛНЕН'
    default:
      break;
  }
}

const initialState = {
    card: {
      visible: false,
      info: {}
    },
    newTask: {
      visible: false,
    },
    user: {
      visible: false,
    },
    storageItem: {
      visible: false,
    },
    work: {
      visible: false,
    }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showCardModal: (state, action) => ({
      ...state,
      card: {
        visible: !state.card.visible,
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
          priority: action.payload[11]
        }
      }
    }),
    closeCardModal: (state) => ({
      ...state,
      card: {
        visible: !state.card.visible,
        info: {}
      }
    }),
    toggleNewTaskModal: (state) => ({
      ...state,
      newTask: {
        visible: !state.newTask.visible
      }
    }),
    toggleUserModal: (state) => ({
      ...state,
      user: {
        visible: !state.user.visible
      }
    }),
    toggleNewStorageItemModal: (state) => ({
      ...state,
      storageItem: {
        visible: !state.storageItem.visible
      }
    }),
    toggleNewWorkModal: (state) => ({
      ...state,
      work: {
        visible: !state.work.visible
      }
    }),
  },
})

export const { showCardModal, closeCardModal, toggleNewTaskModal, toggleUserModal, toggleNewStorageItemModal, toggleNewWorkModal } = modalSlice.actions

export default modalSlice.reducer