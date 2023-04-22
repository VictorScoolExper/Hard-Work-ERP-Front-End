import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        name: "",
        lastname: "",
        role: "",
        loggedIn: false
        // TODO: Add timed logout to delete cookie
    },
    reducers: {
        loginUser(state, action){
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.lastname = action.payload.lastname;
            state.role = action.payload.role;
            if(
                state.id !== null ||  state.id < 0 &&
                state.name !== ""|| state.name !== null &&
                state.lastname !== ""|| state.lastname !== null &&
                state.role !== "" || state.role !== null
            ){
                state.loggedIn = true;
            } else {
                state.loggedIn = false;
            }
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice;