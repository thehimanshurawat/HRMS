import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const payrollApi = createApi({
  reducerPath: "payrollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payroll`,
    credentials: "include",
  }), 
  endpoints: (builder) => ({
    allPayroll: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    // getpayroll
    getPayrollById: builder.query({
      query: (id) => `/${id}`,
    }),
    
        //  data
        addPayroll : builder.mutation({
          query : (payrollData) => ({
              url : "/new",
              method : "POST",
              body: payrollData
          })
      }),

      // Update employee details
 
      updatePayroll: builder.mutation({
        query: ({ id, ...updateData }) => ({   
          url: `/${id}`,
          method: "PUT",
          body: updateData,
        }),
      }),

      // Delete employee
      deletePayroll : builder.mutation({
          query : (id) => ({
              url : `/${id}`,
              method : "DELETE"
          })
      })
  }),
});

export const { useAllPayrollQuery, useAddPayrollMutation,
  useUpdatePayrollMutation, useGetPayrollByIdQuery,
  useDeletePayrollMutation, } = payrollApi;
