import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get token from localStorage
const getStoredAuthData = () => {
  const storedData = localStorage.getItem("follow-along-auth-token-user-name-id");
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing stored auth data:", error);
      return null;
    }
  }
  return null;
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        loginData
      );

      if (!response.data.token) {
        return rejectWithValue('No token received from server');
      }

      const userData = {
        token: response.data.token,
        name: response.data.name,
        id: response.data.id,
        userImage: response.data.userImage,
      };

      // Store user data in localStorage
      localStorage.setItem(
        "follow-along-auth-token-user-name-id",
        JSON.stringify(userData)
      );

      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (signupData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', signupData.name);
      formData.append('email', signupData.email);
      formData.append('password', signupData.password);

      if (signupData.image) {
        formData.append('image', signupData.image);
      }

      const response = await axios.post(
        "http://localhost:8080/user/signup",
        formData
      );

      return { message: response.data.message || 'Signup successful' };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getStoredAuthData()?.token || null,
    user: getStoredAuthData() || null,
    isAuthenticated: !!getStoredAuthData()?.token,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    signupStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearAuthStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearSignupStatus: (state) => {
      state.signupStatus = 'idle';
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("follow-along-auth-token-user-name-id");
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Handle signup
      .addCase(signupUser.pending, (state) => {
        state.signupStatus = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.signupStatus = 'succeeded';
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearAuthStatus, clearSignupStatus, logout } = authSlice.actions;

export default authSlice.reducer;
