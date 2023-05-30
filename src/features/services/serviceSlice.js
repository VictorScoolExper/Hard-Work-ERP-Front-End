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
        await axios.put(COMPANY_API_URL + `/${service.service_id}`, service, {
           headers: {
               "Content-Type" : "application/json",
           },
           withCredentials: true
       });
       return;
   }
);

const initialState = {
    services: null,
    total_services: null,
    status: 'idle',
    error: null
}

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers(builder){
        
    }
})
