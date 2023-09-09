import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null, // user data
    token: null, // authentication token
    isAuthenticated: false, // authentication status
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log("state ",state);
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export const selectUserId = (state) => state.auth.userId;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
