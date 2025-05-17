import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/attendance`,
    credentials: "include",
  }),
  tagTypes : ["Attendance", "Dashboard"],
  endpoints: (builder) => ({
    // Get all employees attendance details
    allAttendance: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags : ["Attendance"]
    }),

    // Get one employee attendance details
    getAttendanceDetails: builder.query({
      query: (empId) => ({
        url: `/${empId}`,
        method: "GET",
      }),
      providesTags : ["Attendance"]
    }),

    // Submit daily task
    dailyTask: builder.mutation({
      query: ({ employee, dailyTask }) => ({
        url: `/submit-task/${employee}`,
        method: "POST",
        body: dailyTask,
      }),
      invalidatesTags : ["Attendance", "Dashboard"]
    }),
  }),
});

export const {
  useAllAttendanceQuery,
  useDailyTaskMutation,
  useGetAttendanceDetailsQuery
} = attendanceApi;
