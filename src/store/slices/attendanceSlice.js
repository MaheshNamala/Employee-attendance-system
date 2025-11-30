import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/attendance';

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const initialState = {
  attendance: [],
  todayStatus: null,
  summary: null,
  allAttendance: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const checkIn = createAsyncThunk(
  'attendance/checkIn',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(`${API_URL}/checkin`, {}, getConfig(token));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkOut = createAsyncThunk(
  'attendance/checkOut',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(`${API_URL}/checkout`, {}, getConfig(token));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTodayStatus = createAsyncThunk(
  'attendance/getTodayStatus',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(`${API_URL}/today`, getConfig(token));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMyHistory = createAsyncThunk(
  'attendance/getMyHistory',
  async ({ month, year }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      let url = `${API_URL}/my-history`;
      if (month && year) url += `?month=${month}&year=${year}`;
      const response = await axios.get(url, getConfig(token));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMySummary = createAsyncThunk(
  'attendance/getMySummary',
  async ({ month, year }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      let url = `${API_URL}/my-summary`;
      if (month && year) url += `?month=${month}&year=${year}`;
      const response = await axios.get(url, getConfig(token));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllAttendance = createAsyncThunk(
  'attendance/getAllAttendance',
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}/all?${params}`, getConfig(token));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const exportAttendance = createAsyncThunk(
  'attendance/exportAttendance',
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}/export?${params}`, {
        ...getConfig(token),
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todayStatus = action.payload.attendance;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.todayStatus = action.payload.attendance;
        state.isSuccess = true;
      })
      .addCase(getTodayStatus.fulfilled, (state, action) => {
        state.todayStatus = action.payload.attendance;
      })
      .addCase(getMyHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendance = action.payload.attendance;
      })
      .addCase(getMySummary.fulfilled, (state, action) => {
        state.summary = action.payload.summary;
      })
      .addCase(getAllAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allAttendance = action.payload.attendance;
      });
  },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;