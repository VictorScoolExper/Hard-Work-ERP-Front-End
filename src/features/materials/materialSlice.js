import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import {MATERIALS_API_URL} from "../../api-routes";

export const getMaterial = createAsyncThunk(
    "materials/getMaterials",
    async () => {
        const response = await axios(MATERIALS_API_URL + "/", {
            method: "get",
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    }
);

export const createMaterial = createAsyncThunk(
    "materials/createMaterial",
    async (material) => {
        await axios.post(MATERIALS_API_URL + "/", material, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

export const editMaterial = createAsyncThunk(
    "materials/editMaterial",
    async (material) => {
         await axios.put(MATERIALS_API_URL + `/${material.material_id}`, material, {
            headers: {
                "Content-Type" : "application/json",
            },
            withCredentials: true
        });
        return;
    }
);

const initialState = {
    materials: [],
    total_materials: 0,
    status: 'idle',
    error: null
}

const materialsSlice = createSlice({
    name: "materials",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder 
        // get material
        .addCase(getMaterial.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getMaterial.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.materials = action.payload.materials;
            state.total_materials = action.payload.length;
        })
        .addCase(getMaterial.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // new material
        // TODO: add functionality to affect redux states
        .addCase(createMaterial.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createMaterial.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(createMaterial.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        // Update material
        .addCase(editMaterial.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(editMaterial.fulfilled, (state, action) => {
            state.status = "succeeded";
        })
        .addCase(editMaterial.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export const {} = materialsSlice.actions;

export default materialsSlice.reducer;

export const selectorSortedMaterials = (state) =>{ 
    if(state.materials.materials != null){
        return state.materials.materials.slice().sort((a, b) => a.material_name.localeCompare(b.material_name))
    } else {
        return null;
    }
}; 

export const selectMaterialById = (state, materialId) =>
    state.materials.materials.find((material) => material.material_id === Number(materialId));
