import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setToken, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers, { getState })=> {
        const token = getState().auth.token
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions)
    console.log(result);
    console.log(api);
    if(result?.error?.status === 403) {
        console.log("sending refresh token")
        //send refresh token to get new access token 
        const refreshResult = await baseQuery('/api/v1/token/refresh', api, extraOptions)
        console.log(refreshResult.data.access_token)
        if(refreshResult?.data) {
            //store the new token 
            api.dispatch(setToken({access_token: refreshResult.data.access_token}))
            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder =>({})
})
