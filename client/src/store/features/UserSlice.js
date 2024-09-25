import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: 'ika',
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload
        },
        logOut: (state) => {
            state.name = null
        }
    },
})

export const { setUser, logOut} = UserSlice.actions

export default UserSlice.reducer