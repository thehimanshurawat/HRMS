import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/auth`, // vite_server = http://localhost:3000
    credentials: "include",
  }),
  endpoints: (builder) => ({
    
    // login mutation
    login: builder.mutation({
      query: (loginCredentials) => ({
        url: "/login",
        method: "POST",
        body: loginCredentials,
      }),
    }),
    // forgot mutation
    submitForgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    // reset mutation
    submitresetPassword: builder.mutation({
      query: (data) => ({
        url: "/resetpassword",
        method: "PUT",
        body: data,
      }),
    }),

    // logout mutation
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

export const getLoggedInEmployee = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/employee/current-user`,
      {
        withCredentials: true,
      }
    );

    // console.log("response from getLogin: ", response.data.loggedInUser);
    const data = response.data.loggedInUser;
    return data;
  } catch (err) {
    console.log("Error fetching logged in user : ", err);
  }
};

export const { useLoginMutation, useLogoutMutation,
  useSubmitForgotPasswordMutation ,
  useSubmitresetPasswordMutation } = userApi;
