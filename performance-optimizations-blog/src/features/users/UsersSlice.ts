import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export interface User {
    id: string,
    name: string,
}

interface UsersState extends Array<User> {}

const initialState: UsersState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response  = await axios.get(USERS_URL)
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export const selectAllUsers = (state: {users: UsersState}) => state.users

export const selectUserById = (state: {users: UsersState}, userId: string | number) => {
    return state.users.find(user => user.id === userId)
}

export default usersSlice.reducer