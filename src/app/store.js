import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employees/employeeSlice";
import clientReducer from "../features/clients/clientSlice";
import vendorReducer from "../features/vendor/vendorSlice";
import companyReducer from "../features/companies/companySlice";
import serviceReducer from "../features/services/serviceSlice";

const reducer = {
  auth: authReducer,
  employees: employeeReducer,
  clients: clientReducer,
  vendors: vendorReducer,
  companies: companyReducer,
  services: serviceReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
