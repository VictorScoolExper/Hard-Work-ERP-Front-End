import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import messageReducer from "../features/messages/message-slice";
import employeeReducer from "../features/employees/employee-slice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  employees: employeeReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
