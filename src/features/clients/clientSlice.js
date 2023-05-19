import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

import {CLIENT_API_URL} from "../../api-routes";

const initialState = {
    client: null,
    total_client: null,
    status: 'idle',
    error: null
}

export const fetchClients = createAsyncThunk(
    "client/getAll",
    async () => {
        const response = await axios(CLIENT_API_URL + "/", {
            method: "get",
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true,
        });

        return response.data;
    }
);

export const createVendor = createAsyncThunk(
    "client/createVendor",
    async (newVendor) => {
        await axios.post(CLIENT_API_URL + "/", newVendor, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });

        return;
    }
);

export const editVendor = createAsyncThunk(
    "client/editVendor",
    async (vendor) => {
        await axios.put(CLIENT_API_URL + `/${vendor.get("vendorId")}`, vendor, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        })
        return;
    }
);

export const deleteVendor = createAsyncThunk(
    "client/deleteVendor",
    async (vendorId) =>{
        await axios.delete(CLIENT_API_URL + `${vendorId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        return
    }
)

const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        // get all client
        .addCase(fetchClients.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchClients.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.client = action.payload.clients;
            state.total_client = action.payload.list_length;
        })
        .addCase(fetchClients.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // adding new client
        .addCase(createVendor.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createVendor.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(createVendor.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // update client
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
});

export const {} = clientsSlice.actions;

export default clientsSlice.reducer;

// fast access vendor
export const selectSortedEmployee = (state) =>{ 
    if(state.clients.client != null){
        return state.clients.client.slice().sort((a, b) => a.name.localeCompare(b.name))
    } else {
        return null
    }
    
};

export const selectClientById = (state, clientId) =>
    state.clients.clients.find((client) => client.client_id === Number(clientId));

