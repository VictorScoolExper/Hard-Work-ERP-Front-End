import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

import {VENDOR_API_URL} from "../../api-routes";

export const createVendor = createAsyncThunk(
    "vendor/createVendor",
    async (newVendor) =>{
        await axios.post(VENDOR_API_URL + "/", newVendor, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        })
    }
);

export const fetchVendors = createAsyncThunk(
    "vendor/getVendors",
    async () => {
        await axios(VENDOR_API_URL + "/", {
            method: "get",
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true,
        });
        return;
    }
)

export const editVendor = createAsyncThunk(
    "vendor/editVendor",
    async (vendor) => {
        await axios.put(VENDOR_API_URL + `/${vendor.vendor_id}`, vendor, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

export const deleteVendor = createAsyncThunk(
    "vendor/deleteVendor",
    async (vendorId) => {
        await axios.delete(VENDOR_API_URL + `/${vendorId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        return
    }
)


const initialState = {
    vendors: null,
    total_vendors: null,
    status: 'idle',
    error: null
}

const vendorsSlice = createSlice({
    name: "vendors",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        // add vendor
        .addCase(createVendor.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createVendor.fulfilled, (state, action) =>{
            state.status = "succeeded";
            state.vendors = action.payload.vendors;
            state.total_vendors = action.payload.list_length;
        })
        .addCase(createVendor.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // get vendors
        .addCase(fetchVendors.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchVendors.fulfilled, (state, action) =>{
            state.status = "succeeded";
            state.vendors = action.payload.vendors;
            state.total_vendors = action.payload.list_length;
        })
        .addCase(fetchVendors.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // edit vendor
        .addCase(editVendor.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(editVendor.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(editVendor.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // delete vendor
        .addCase(deleteVendor.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(deleteVendor.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(deleteVendor.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export const {} = vendorsSlice.actions;

export default vendorsSlice.reducer;

export const selectSortedEmployees = (state) =>{
    if(state.vendors.vendors != null){
        return state.vendors.vendors.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else {
        return null;
    }
}

export const selectVendorById  = (state, vendorId) =>
    state.vendors.vendors.find((vendor) => vendor.vendor_id === Number(vendorId));


