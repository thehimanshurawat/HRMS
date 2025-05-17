import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const complaintsApi = createApi({
  reducerPath: "complaintsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/complaint`,
    credentials: "include",
  }),
  tagTypes : ["Complaint", "Notification"],
  endpoints: (builder) => ({
    // Submitting complaint
    submitComplaint: builder.mutation({
      query: (formData) => ({
        url: "/submit",
        method: "POST",
        body: formData,
      }),
      invalidatesTags : ["Complaint", "Notification"]
    }),

    // 
    allComplaints: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags : ["Complaint"]
    }),
  }),
});

export const { useSubmitComplaintMutation, useAllComplaintsQuery } =
  complaintsApi;
