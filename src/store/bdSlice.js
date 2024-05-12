import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employees: [],
    clients: [],
    tasks: [],
    works: [],
    storage: [],
    jobTickets: [],
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
        setWorks: (state, action) => ({
            ...state,
            works: action.payload  
        }),
        setStorage: (state, action) => ({
            ...state,
            storage: action.payload  
        }),
        setJobTickets: (state, action) => ({
            ...state,
            jobTickets: action.payload  
        })
    }
})

export const { setEmployees, setClients, setTasks, setWorks, setStorage, setJobTickets } = bdSlice.actions

export default bdSlice.reducer