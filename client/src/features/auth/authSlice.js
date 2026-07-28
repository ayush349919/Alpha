import { createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshAccessToken, registerUser, logoutUser } from "./authThunk";

const initialState = {
    user: null,
    accessToken: null,
    error: null,
    loading: false,
    isAuthChecked: false,
};

const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            //login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthChecked = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthChecked = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //refresh Access token
            .addCase(refreshAccessToken.pending, (state) => {
                state.error = null;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(refreshAccessToken.rejected, (state) => {
                state.accessToken = null;
                state.user = null;
                state.isAuthChecked = true;
            })

            //logout
            // logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.isAuthChecked = false;
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    }
})

export default authslice.reducer;