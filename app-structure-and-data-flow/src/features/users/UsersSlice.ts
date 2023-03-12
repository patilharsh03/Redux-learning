import { createSlice } from "@reduxjs/toolkit";

export interface User {
    id: string,
    name: string,
}

interface UsersState extends Array<User> {}

const initialState: UsersState = [
    {id: '0', name: 'Harsh Patil'},
    {id: '1', name: 'Cecil'},
    {id: '2', name: 'Warpbud'},
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state: {users: UsersState}) => state.users

export default usersSlice.reducer