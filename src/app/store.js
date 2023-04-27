import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import messageReducer from "../features/messages/message-slice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
