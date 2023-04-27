import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { EMPLOYEE_API_URL } from "../../api-routes";

// Server URL
const API_URL = EMPLOYEE_API_URL;

// Get All Employee Thunk
// lets you get all active or inactive employees by passing true or false
export const fetchAllEmployees = createAsyncThunk("employees/getAll", async (data) => {
    const response = await axios(API_URL + "/" , {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });
    return response.data;
});

const initialState = {
  employees: null,
  status: "idle",
  error: null,
};

const employeesSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    // get all employee 
    .addCase(fetchAllEmployees.pending, (state, action) =>{
        state.status = "loading"
    })
    .addCase(fetchAllEmployees.fulfilled, (state, action) =>{
        // state.status = 'succeeded'
        // state.employees = action.payload;
        console.log(action.payload);
    })
  },
});
