import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import {SERVICES_API_URL} from '../../api-routes';

export const getServices = createAsyncThunk(
    "service/getServices",
    async () => {
        const response = await axios(SERVICES_API_URL + "/", {
            method: "get",
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true
        });
        return response.data;
    }
);

export const createService = createAsyncThunk(
    "service/createService",
    async (service) => {
        await axios.post(SERVICES_API_URL + "/", service, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

export const editService = createAsyncThunk(
    "service/editService",
    async (service) => {
        await axios.put(SERVICES_API_URL + `/${service.service_id}`, service, {
           headers: {
               "Content-Type" : "application/json",
           },
           withCredentials: true
       });
       return;
   }
);

const initialState = {
    services: [],
    total_services: null,
    status: 'idle',
    error: null
}

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        // get services
            .addCase(getServices.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.services = action.payload.services;
                state.total_services = action.payload.length;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
        // create service
        .addCase(createService.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createService.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(createService.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // update service
        .addCase(editService.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(editService.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(editService.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // delete services
    }
});

export const {} = servicesSlice.actions;
export default servicesSlice.reducer;

export const selectorSortedServices = (state) => {
    if(state.services.total_services != null){
        return state.services.services.slice().sort((a,b) => a.service_name.localeCompare(b.service_name));
    } else {
        return null;
    }
}

export const selectServiceById = (state, serviceId) =>
    state.services.services.find((service) => service.service_id === Number(serviceId));
