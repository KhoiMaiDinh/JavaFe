import { apiSlice } from "../../app/api/apiSlice";
const qs = require('qs');

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/login',
                headers: { 
                    'content-type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
                credentials: 'include',
                body: qs.stringify({
                    username: credentials.user,
                    password: credentials.pwd
                })
            })
        }),
        getUserInfo: builder.mutation({
            query: credentials => ({
                url: '/api/user',
                headers: { 'authorization': `Bearer ${credentials.token}`},
                method: 'GET',
            })
        }),
        refreshToken: builder.mutation({
            query: credentials => ({
                url: '/api/v1/token/refresh',
                credentials: 'include',
                method: 'GET',
            })
        }),
    })
})

export const {
    useLoginMutation,
    useGetUserInfoMutation,
    useRefreshTokenMutation
} = authApiSlice