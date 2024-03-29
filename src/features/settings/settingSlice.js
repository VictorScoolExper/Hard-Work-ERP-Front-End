import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_SETTING_API_URL } from "../../api-routes";

export const getAppSettings = createAsyncThunk(
  "app_settings/getAppSettings",
  async () => {
    const response = await axios(APP_SETTING_API_URL + "/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const createAppSetting = createAsyncThunk(
    "app_settings/createAppSetting",
    async (appSetting) => {
        await axios.post(APP_SETTING_API_URL + "/", appSetting, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

export const updateAppSetting = createAsyncThunk(
    "app_settings/updateAppSetting",
    async (appSetting) => {
         await axios.put(APP_SETTING_API_URL + `/`, appSetting, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

const initialState = {
    appSettings: [],
    status: 'idle',
    error: null
}

const appSettingsSlice = createSlice({
    name: "app_settings",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        // get app settings
        .addCase(getAppSettings.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getAppSettings.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.appSettings = action.payload.appSettings;
        })
        .addCase(getAppSettings.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // add app settings
        // TODO: add functionality that affects redux state
        .addCase(createAppSetting.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createAppSetting.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(createAppSetting.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // update app settings
        // TODO: add functionality that affects redux state
        .addCase(updateAppSetting.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(updateAppSetting.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(updateAppSetting.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
});

export const {} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;

export const selectorSortedAppSettings = (state) =>{ 
    if(state.app_settings.appSettings != null){
        return state.app_settings.appSettings.slice().sort((a, b) => a.setting_name.localeCompare(b.setting_name))
    } else {
        return null;
    }
}; 

export const selectAppSettingByName = (state, settingName) =>
    state.app_settings.appSettings.find((appSetting) => appSetting.setting_name === settingName);
