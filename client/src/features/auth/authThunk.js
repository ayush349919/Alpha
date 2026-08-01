import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, refreshApi, registerApi, logoutApi } from "./authApi";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            return await loginApi(data);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            return await registerApi(data);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      return await refreshApi();
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null);
      }

      return rejectWithValue(
        error.response?.data?.message || "Refresh failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await logoutApi();
            return true;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);

