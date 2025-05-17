import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { userApi } from "./api/userApi";
import { employeeApi } from "./api/employeeApi";
import { payrollApi } from "./api/payrollApi";
import { attendanceApi } from "./api/attendanceApi";
import { complaintsApi } from "./api/complaintsApi";
import { leaveApi } from "./api/leaveApi";
import { dashboardApi } from "./api/dashboardApi";
import { notificationApi } from "./api/notificationApi";

export const store = configureStore({
  reducer: {
    // API
    [userApi.reducerPath]: userApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [payrollApi.reducerPath]: payrollApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [complaintsApi.reducerPath]: complaintsApi.reducer,
    [leaveApi.reducerPath]: leaveApi.reducer,
    [dashboardApi.reducerPath] : dashboardApi.reducer,
    [notificationApi.reducerPath] : notificationApi.reducer,
    // Reducer
    [userReducer.name]: userReducer.reducer,
  },

  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(
      userApi.middleware,
      employeeApi.middleware,
      payrollApi.middleware,
      attendanceApi.middleware,
      complaintsApi.middleware,
      leaveApi.middleware,
      dashboardApi.middleware,
      notificationApi.middleware
    ),
});
