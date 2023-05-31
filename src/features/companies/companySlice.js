import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import {COMPANY_API_URL} from "../../api-routes";

export const getCompanies = createAsyncThunk(
    "company/getCompanies",
    async () => {
        const response = await axios(COMPANY_API_URL + "/", {
            method: "get",
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    }
);

export const createCompany = createAsyncThunk(
    "company/createCompany",
    async (company) => {
        await axios.post(COMPANY_API_URL + "/", company, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

export const editCompany = createAsyncThunk(
    "company/editCompany",
    async (company) => {
         await axios.put(COMPANY_API_URL + `/${company.company_id}`, company, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

export const deleteCompany = createAsyncThunk(
    "company/deleteCompany",
    async (companyId) => {
        await axios.delete(COMPANY_API_URL + `${companyId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        return
    }
);

const initialState = {
    companies: [],
    total_companies: null,
    status: 'idle',
    error: null
}

const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        // get companies
        .addCase(getCompanies.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getCompanies.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.companies = action.payload.companies;
            state.total_companies = action.payload.length;
        })
        .addCase(getCompanies.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // new company
        .addCase(createCompany.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createCompany.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(createCompany.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // Update company
        .addCase(editCompany.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(editCompany.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(editCompany.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // delete company
        .addCase(deleteCompany.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(deleteCompany.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(deleteCompany.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
});

export const {} = companiesSlice.actions;

export default companiesSlice.reducer;

export const selectorSortedCompanies = (state) =>{ 
    if(state.companies.companies != null){
        return state.companies.companies.slice().sort((a, b) => a.name.localeCompare(b.name))
    } else {
        return null
    }
}; 

export const selectCompanyById = (state, companyId) =>
    state.companies.companies.find((company) => company.company_id === Number(companyId));

