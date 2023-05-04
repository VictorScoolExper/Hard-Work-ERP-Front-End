import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

import { EMPLOYEE_API_URL } from "../../api-routes";

// Server URL
const API_URL = EMPLOYEE_API_URL;

const initialState = {
  employees: null,
  total_employees: null,
  status: "idle",
  error: null,
};


// const employeeAdapter = createEntityAdapter({
//   // selectId: (employees) => employees.employee_id,
//   sortComparer: (a,b) => a.name.localeCompare(b.name)
// })
// const initialState = employeeAdapter.getInitialState({
//   status: 'idle',
//   error: null,
// })


// Get All Employee Thunk
// lets you get all active or inactive employees by passing true or false
export const fetchAllEmployees = createAsyncThunk(
  "employees/getAll",
  async (data) => {
    const response = await axios(API_URL + "/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const addNewEmployee = createAsyncThunk(
  "employee/addNewEmployee",
  async(newEmployee) => {
    const response = await axios(API_URL + "/", newEmployee, {
      method: "post",
      headers: {
        // "Content-Type": "application/json",
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
      // data: newEmployee
    });
    return response.data;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // get all employee
      .addCase(fetchAllEmployees.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload.employees.slice().sort((a, b) => a.name.localeCompare(b.name));;
        state.total_employees = action.payload.total_employees;

        // Use the `upsertMany` reducer as a mutating update utility
        // employeeAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // adding new employee
      .addCase(addNewEmployee.pending, (state, action) =>{
        state.status = "loading";
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        fetchAllEmployees();
      })
      .addCase(addNewEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const {} = employeesSlice.actions;

export default employeesSlice.reducer;

// fast access to employees
export const selectEmployees = (state) => state.employees.employees;

export const selectEmployeeById = (state, employeeId) => 
  state.employees.employees.find((employee) => employee.employee_id === Number(employeeId));



