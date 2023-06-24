import {createSlice} from '@reduxjs/toolkit'

const authSlice= createSlice({
    name:'auth',
    initialState: {user: null, token: null},
    reducers:{
        setCredentials: (state,action)=>{
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state,action) => {
            state.user = null
            state.token = null
        },
        setUserInfo: (state,action)=>{
            const { user } = action.payload
            state.user = user
        },
        setToken: (state,action)=>{
            const { access_token } = action.payload
            state.token = access_token;
        },
    },
})

export const { setCredentials, logOut, setUserInfo, setToken } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
