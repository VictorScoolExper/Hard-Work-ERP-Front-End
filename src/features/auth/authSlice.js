import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Server URL
const API_URL = "http://localhost:4000/api/v1/auth";

// TODO: ADD to user
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, status: "idle", error: null }
  : { isLoggedIn: false, user: null, status: "idle", error: null };

// Login Thunk middleware
export const loginUser = createAsyncThunk("auth/login", async ({email, password}) => {
  const responseLogin = await axios(API_URL + "/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: { email, password },
  });
  return responseLogin.data;
});
// Logout Thunk Middleware

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  // the extraReducers is used when a slice reducer needs to respond to 
  //  other actions that weren't defined as part of this slice's reducers field. 
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { loginFulfilled, loginRejected, logoutFulfilled } =
  authSlice.actions;

export default authSlice.reducer;

// fast access to user
export const selectUser = (state) => state.auth.user;
