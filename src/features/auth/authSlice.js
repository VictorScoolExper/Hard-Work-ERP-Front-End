import { createSlice } from "@reduxjs/toolkit";

// TODO: ADD to user
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, status: 'idle', error: null }
  : { isLoggedIn: false, user: null, status: 'idle', error: null  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // registerFulfilled: (state, action) => {
    //   state.isLoggedIn = false;
    // },
    // registerRejected: (state, action) => {
    //   state.isLoggedIn = false;
    // },
    loginFulfilled: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    loginRejected: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    logoutFulfilled: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {loginFulfilled, loginRejected, logoutFulfilled } = authSlice.actions;

export default authSlice.reducer;

// fast access to user
export const selectUser = state => state.auth.user;