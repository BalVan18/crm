import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employees: [],
    clients: [],
    tasks: []
}

export const bdSlice = createSlice({
    name: 'bd',
    initialState,
    reducers: {
        setEmployees: (state, action) => ({
            ...state,
            employees: action.payload
        }),
        setClients: (state, action) =>({
            ...state,
            clients: action.payload
        }),
        setTasks: (state, action) => ({
            ...state,
            tasks: action.payload
        }),
    }
})

export const { setEmployees, setClients, setTasks } = bdSlice.actions

export default bdSlice.reducer