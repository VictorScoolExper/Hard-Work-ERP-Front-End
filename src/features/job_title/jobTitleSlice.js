import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

import { JOB_TITLE_API_URL } from "../../api-routes";

const API_URL = JOB_TITLE_API_URL;

const initialState = {
  job_titles: null,
  total_job_titles: null,
  status: "idle",
  error: null,
};

export const fetchJobTitles = createAsyncThunk("jobTitle/get", async () => {
  const response = await axios(API_URL + "/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
});

export const addJobTitle = createAsyncThunk(
  "jobTitle/add",
  async (jobTitle) => {
    const response = await axios.post(API_URL + "/", jobTitle, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const updateJobTitle = createAsyncThunk(
  "jobTitle/update",
  async (job_title) => {
    const response = await axios.put(
      API_URL,
      `/${job_title.get("job_title_id")}`,
      job_title,
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

export const deleteJobTitle = createAsyncThunk(
  "jobTitle/delete",
  async (job_title_id) => {
    const response = await axios.delete(API_URL + `/${job_title_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

const jobTitleSlice = createSlice({
  name: "jobTitle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // get job title
      .addCase(fetchJobTitles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchJobTitles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.job_titles = action.payload.job_titles;
        state.total_job_titles = action.payload.total_jobs;
      })
      .addCase(fetchJobTitles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // add job title
      .addCase(addJobTitle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addJobTitle.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addJobTitle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // update job title
      .addCase(updateJobTitle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateJobTitle.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateJobTitle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // delete job title
      .addCase(deleteJobTitle.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteJobTitle.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteJobTitle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = jobTitleSlice.actions;

export default jobTitleSlice.reducer;

export const selectorJobTitle = (state) => state.jobTitle.jobTitles;

export const selectorSortedJobTitle = (state) => {
  if (state.jobTitle.jobTitles != null) {
    return state.jobTitle.jobTitles
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return [];
  }
};

export const selectorJobTitleById = (state, job_title_id) =>
  state.jobTitle.jobTitles.find(
    (jobTitle) => jobTitle.job_title_id === Number(job_title_id)
  );
