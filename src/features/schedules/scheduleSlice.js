import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { SCHEDULE_SERVICE_API_URL } from "../../api-routes";

export const createSchedule = createAsyncThunk(
    "schedules/createSchedule",
    async (schedule) => {
        await axios.post(SCHEDULE_SERVICE_API_URL + "/", schedule, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

const initialState = {
    scheduledServices: [],
    total_scheduled_services: 0,
    status: "idle",
    error: null
}

const scheduleSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        // create schedule
        .addCase(createSchedule.pending, (state, action)=>{
            state.status = "loading";
        })
        .addCase(createSchedule.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(createSchedule.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
});

export const {} = scheduleSlice.actions;

export default scheduleSlice.reducer;



