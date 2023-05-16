import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employees/employeeSlice";
import clientReducer from "../features/clients/clientSlice";

const reducer = {
  auth: authReducer,
  employees: employeeReducer,
  clients: clientReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
