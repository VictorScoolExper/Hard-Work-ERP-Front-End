import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

import { COMPANY_DEPARTMENT_API_URL } from "../../api-routes";

const API_URL = COMPANY_DEPARTMENT_API_URL;

const initialState = {
  departments: null,
  total_departments: null,
  status: "idle",
  error: null,
};

export const fetchAllCompDepartment = createAsyncThunk(
  "companyDepartment/getAll",
  async () => {
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

export const addNewCompanyDepartment = createAsyncThunk(
  "companyDepartment/add",
  async (newDepartment) => {
    const response = await axios.post(API_URL + "/", newDepartment, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const updateCompanyDepartment = createAsyncThunk(
  "companyDepartment/update",
  async (department) => {
    const response = await axios.put(
      API_URL,
      `/${department.get("department_id")}`,
      department,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const deleteCompanyDepartment = createAsyncThunk(
  "companyDepartment/delete",
  async (department_id) => {
    const response = await axios.delete(API_URL + `/${department_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // get company departments
      .addCase(fetchAllCompDepartment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllCompDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.departments = action.payload.company_department;
        state.total_departments = action.payload.total_departments;
      })
      .addCase(fetchAllCompDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // add company department
      .addCase(addNewCompanyDepartment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewCompanyDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewCompanyDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // update company department
      .addCase(updateCompanyDepartment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCompanyDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateCompanyDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // delete company department
      .addCase(deleteCompanyDepartment.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteCompanyDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteCompanyDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = departmentSlice.actions;

export default departmentSlice.reducer;

export const selectorDepartment = (state) => state.department.departments;

export const selectorSortedDepartment = (state) => {
  if (state.department.departments != null) {
    return state.department.departments
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return [];
  }
};

export const selectorDepartmentById = (state, department_id) =>
  state.department.departments.find(
    (department) => department.department_id === Number(department_id)
  );
