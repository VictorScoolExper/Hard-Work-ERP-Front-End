import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

import {CLIENT_API_URL} from "../../api-routes";

const initialState = {
    clients: null,
    total_clients: null,
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

export const createClient = createAsyncThunk(
    "client/createClient",
    async (newClient) => {
        await axios.post(CLIENT_API_URL + "/", newClient, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });

        return;
    }
);

export const editClient = createAsyncThunk(
    "client/editClient",
    async (client) => {
        await axios.put(CLIENT_API_URL + `/${client.get("vendorId")}`, client, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        })
        return;
    }
);

export const deleteClient = createAsyncThunk(
    "client/deleteClient",
    async (clientId) =>{
        await axios.delete(CLIENT_API_URL + `${clientId}`, {
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
            state.clients = action.payload.clients;
            state.total_clients = action.payload.list_length;
        })
        .addCase(fetchClients.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // adding new client
        .addCase(createClient.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createClient.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(createClient.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // update client
        .addCase(editClient.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(editClient.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(editClient.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // delete client
        .addCase(deleteClient.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(deleteClient.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(deleteClient.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
});

export const {} = clientsSlice.actions;

export default clientsSlice.reducer;

// fast access vendor
export const selectSortedEmployee = (state) =>{ 
    if(state.clients.clients != null){
        return state.clients.clients.slice().sort((a, b) => a.name.localeCompare(b.name))
    } else {
        return null
    }
};

export const selectClientById = (state, clientId) =>
    state.clients.clients.find((client) => client.client_id === Number(clientId));

