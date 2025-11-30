// src/store/slices/dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/dashboard';

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const initialState = {
  stats: null,
  isLoading: false,
  isError: false,
  message: '',
};

// Get employee dashboard stats
export const getEmployeeStats = createAsyncThunk(
  'dashboard/getEmployeeStats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(`${API_URL}/employee`, getConfig(token));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get manager dashboard stats
export const getManagerStats = createAsyncThunk(
  'dashboard/getManagerStats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(`${API_URL}/manager`, getConfig(token));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.stats;
      })
      .addCase(getEmployeeStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getManagerStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getManagerStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.stats;
      })
      .addCase(getManagerStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;