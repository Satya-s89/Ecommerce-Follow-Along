import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setTokenCookie,
  getTokenCookie,
  setUserCookie,
  getUserCookie,
  clearAuthCookies
} from '../../utils/cookies';

// Get auth data from cookies
const getStoredAuthData = () => {
  return getUserCookie();
};

// Get token from cookies
const getStoredToken = () => {
  return getTokenCookie();
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
        name: response.data.name,
        id: response.data.id,
        userImage: response.data.userImage,
      };

      // Store token in cookie
      setTokenCookie(response.data.token);

      // Store user data in cookie
      setUserCookie(userData);

      return {
        token: response.data.token,
        ...userData
      };
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

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Call the backend logout endpoint to clear the cookie
      await axios.post(
        "http://localhost:8080/user/logout",
        {},
        { withCredentials: true } // Important to include cookies
      );

      return { success: true };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getStoredToken() || null,
    user: getStoredAuthData() || null,
    isAuthenticated: !!getStoredToken(),
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
    // Sync logout (for immediate UI update)
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      // Clear auth cookies on client side
      clearAuthCookies();
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
      })

      // Handle logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        // Clear auth cookies on client side
        clearAuthCookies();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Even if the server request fails, we should still log out on the client side
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        // Clear auth cookies on client side
        clearAuthCookies();
      });
  },
});

export const { clearAuthStatus, clearSignupStatus, logout } = authSlice.actions;

export default authSlice.reducer;
