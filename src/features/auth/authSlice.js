import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {AUTH_API_URL} from "../../api-routes";

// Server URL
const API_URL = AUTH_API_URL;

// TODO: ADD to user
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, status: "idle", error: null }
  : { isLoggedIn: false, user: null, status: "idle", error: null };

// Login Thunk middleware
export const loginUser = createAsyncThunk("auth/login", async ({email, password}) => {
  const response = await axios(API_URL + "/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: { email, password },
  });
  return response.data;
});

// Logout Thunk Middleware
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios(API_URL + "/logout", {
    method: "get",
    withCredentials: true
  });
  return response.data
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  // the extraReducers is used when a slice reducer needs to respond to 
  //  other actions that weren't defined as part of this slice's reducers field. 
  extraReducers(builder) {
    builder
    // Login
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
    // logout 
      .addCase(logoutUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        localStorage.removeItem('user');
        // localStorage.clear();
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action)=>{
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const {} = authSlice.actions;

export default authSlice.reducer;

// fast access to user
export const selectUser = (state) => state.auth.user;
