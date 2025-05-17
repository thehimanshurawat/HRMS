import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
    reducerPath : "notificationApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/notification`,
        credentials : "include"
    }),
    tagTypes : ["Notification"],
    endpoints : (builder) => ({
        // Get all notifications
        getEmployeeNotifications : builder.query({
            query : () => ({
                url : "/all",
                method : "GET"
            }),
            providesTags : ["Notification"],
            keepUnusedDataFor : 0
        }),

        // Mark all notifications as read
        markAsRead : builder.mutation({
            query : () => ({
                url : "/mark-as-read",
                method : "PATCH"
            }),
            invalidatesTags : ["Notification"]
        })
    })
})

export const {useLazyGetEmployeeNotificationsQuery,useGetEmployeeNotificationsQuery, useMarkAsReadMutation} = notificationApi;