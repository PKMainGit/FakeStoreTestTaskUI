// src/slices/registerSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Початковий стан
const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

// Асинхронний thunk для реєстрації нового користувача
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (
    credentials: {
      username: string;
      password: string;
      role: string;
      adminUser?: string;
      adminPass?: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/create-first-user",
        credentials
      );
      return response.data; // { success: true }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegister: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
