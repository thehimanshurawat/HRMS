import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
    reducerPath : "dashboardApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/dashboard`,
        credentials : "include"
    }),
    tagTypes : ["Dashboard"],
    endpoints : (builder) => ({
        
        // Get Dashboard Data
        dashboardData : builder.query({
            query : () => ({
                url : "/",
                method : "GET"
            }),
            providesTags : ["Dashboard"]
        }),

        // Get Dashboard Data
        userdashboard : builder.query({
            query : () => ({
                url : "/user-dashboard",
                method : "GET"
            }),
            providesTags : ["Dashboard"]
        })
    })
})

export const {useDashboardDataQuery ,useUserdashboardQuery} = dashboardApi;