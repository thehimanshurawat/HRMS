import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leaveApi = createApi({
  reducerPath: "leaveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/leave`,
    credentials: "include",
  }),
  tagTypes : ["Leave", "Employee", "Notification"],
  endpoints: (builder) => ({
    
    // Get employee leave
    employeeLeave: builder.query({
      query: (empId) => ({
        url: `/${empId}`,
        method: "GET",
      }),
      providesTags : ["Leave"]
    }),
    
    // Apply for leave
    submitLeave: builder.mutation({
      query: (formData) => ({
        url: "/apply",
        method: "POST",
        body: formData,
      }),
      invalidatesTags : ["Leave", "Employee", "Notification"]
    }),

    // update leave status
    updateLeaveStatus : builder.mutation({
      query : ({status, leaveId}) => ({
        url : `/${leaveId}`,
        method : "PUT",
        body : {status}
      }),
      invalidatesTags : ["Leave", "Employee", "Notification"]
    })
  }),
});

export const { useEmployeeLeaveQuery, useSubmitLeaveMutation, useUpdateLeaveStatusMutation } = leaveApi;
