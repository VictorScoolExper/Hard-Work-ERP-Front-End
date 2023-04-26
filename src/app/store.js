import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/slices/auth";
import messageReducer from "../store/slices/message";

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
