import { apiSlice } from "../../app/api/apiSlice";
const qs = require('qs');

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        postComment: builder.mutation({
            query: credentials => ({
                url: '/api/v1/comment',
                headers:{ 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                body: qs.stringify({
                    postedBy: credentials.user,
                    comment: credentials.comment,
                    pinId: credentials.pinId
                })
            })
        }),

        getComment: builder.mutation({
            query: credentials => ({
                url: `/api/v1/comment/get/${credentials.pinId}`,
                method: 'GET',
            })
        })
    })
})

export const {
    useGetCommentMutation,
    usePostCommentMutation
} = commentApiSlice    