import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
    reducerPath : "employeeApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/employee`,
        credentials : "include"
    }),
    tagTypes : ["Employee", "Dashboard"],
    endpoints : (builder) => ({
        // Add employee
        createEmployee : builder.mutation({
            query : (employeeData) => ({
                url : '/new',
                method : "POST",
                body : employeeData
            }),
            invalidatesTags : ["Employee", "Dashboard"]
        }),

        // get All employees
        allEmployees : builder.query({
            query : () => ({
                url : '/all',
                method : 'GET'
            }),
            providesTags : ["Employee"]
        }),

        // get Specific employee data
        employeeDetails : builder.query({
            query : (empId) => ({
                url : `/${empId}`,
                method : "GET"
            }),
            providesTags : ["Employee"]
        }),

        // Update employee details
        updateEmployee : builder.mutation({
            
            query : ({updateData, empId}) => ({
                url : `/${empId}`,
                method : 'PUT',
                body : updateData
            }),
            invalidatesTags : ["Employee", "Dashboard"]
        }),

        // Delete employee
        deleteEmployee : builder.mutation({
            query : (empId) => {
            // console.log("empId : ", empId)
              return {
                url : `/${empId}`,
                method : "DELETE"
            }},
            invalidatesTags : ["Employee", "Dashboard"]
        })
    })
})

export const {useAllEmployeesQuery, useEmployeeDetailsQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation} = employeeApi;