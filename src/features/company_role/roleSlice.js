import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

import { COMPANY_ROLE_API_URL } from "../../api-routes";

const API_URL = COMPANY_ROLE_API_URL;

const initialState = {
  roles: null,
  total_roles: null,
  status: "idle",
  error: null,
};

export const fetchRoles = createAsyncThunk("companyRole/get", async () => {
  const response = await axios(API_URL + "/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
});

export const addCompanyRoles = createAsyncThunk(
  "companyRole/add",
  async (newRole) => {
    const response = await axios.post(API_URL + "/", newRole, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const updateCompanyRole = createAsyncThunk(
  "companyRole/update",
  async (role) => {
    const response = await axios.put(API_URL, `/${role.get("role_id")}`, role, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const deleteCompanyRole = createAsyncThunk(
  "companyRole/delete",
  async (role_id) => {
    const response = await axios.delete(API_URL + `/${role_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // get roles
      .addCase(fetchRoles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = action.payload.company_roles;
        state.total_roles = action.payload.total_roles;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // add roles
      .addCase(addCompanyRoles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCompanyRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addCompanyRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // update roles
      .addCase(updateCompanyRole.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCompanyRole.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateCompanyRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // delete company role
      .addCase(deleteCompanyRole.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteCompanyRole.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteCompanyRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = roleSlice.actions;

export default roleSlice.reducer;

export const selectorRoles = (state) => state.role.roles;

export const selectorSortedRoles = (state) => {
  if (state.role.roles != null) {
    return state.role.roles
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return [];
  }
};

export const selectorRoleById = (state, role_id) =>
  state.role.roles.find(
    (role) => role.role_id === Number(role_id)
  );