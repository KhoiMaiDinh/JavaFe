import { apiSlice } from "../../app/api/apiSlice";
const qs = require('qs');

export const pinApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        FeedQuery: builder.mutation({
            query: credentials => ({
                url: '/api/v1/pin/all',
                method: 'GET',
            })
        }),
        getSavedUser: builder.mutation({
            query: credentials => ({
                url: `/api/v1/save/${credentials.pinId}`,
                method: 'GET',
            })
        }),
        postPin: builder.mutation({
            query: credentials => ({
                url: '/api/v1/pin',
                headers:{ 'content-type': 'multipart/form-data',
                            Accept: 'application/json', 
                        },
                method: 'POST',
                body: credentials.formData,
                // formData: true,
            })
        }),
        postSavePinByUser: builder.mutation({
            query: credentials =>({
                url: 'api/v1/save/',
                method: 'POST',
                body: credentials,
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        getPinByUser: builder.mutation({
            query: credentials => ({
                url: `/api/v1/pin/${credentials.userId}/created`,
                method: 'GET',
            })
        }),
        getPinSavedByUser: builder.mutation({
            query: credentials => ({
                url: `/api/v1/pin/${credentials.userId}/save`,
                method: 'GET',
            })
        })
    })
})

export const {
    useFeedQueryMutation,
    useGetSavedUserMutation,
    usePostPinMutation,
    useGetPinSavedByUserMutation,
    usePostSavePinByUserMutation,
    useGetPinByUserMutation
} = pinApiSlice    