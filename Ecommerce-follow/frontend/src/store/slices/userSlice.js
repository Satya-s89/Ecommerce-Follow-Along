import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Get initial user data from localStorage
const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id")) || null;

// Async thunk for fetching user addresses
export const fetchUserAddresses = createAsyncThunk(
  'user/fetchAddresses',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const { isAuthenticated } = getState().auth;
      if (!isAuthenticated) {
        return rejectWithValue('User not authenticated');
      }

      const response = await api.get("/address");
      return response.data.addresses;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch addresses');
    }
  }
);

// Async thunk for adding a new address
export const addUserAddress = createAsyncThunk(
  'user/addAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await api.post("/address", addressData);
      return response.data.address;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add address');
    }
  }
);

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: userData,
    addresses: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    addressAddStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      // Save to localStorage
      localStorage.setItem("follow-along-auth-token-user-name-id", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userData = null;
      state.addresses = [];
      // Remove from localStorage
      localStorage.removeItem("follow-along-auth-token-user-name-id");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserAddresses
      .addCase(fetchUserAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle addUserAddress
      .addCase(addUserAddress.pending, (state) => {
        state.addressAddStatus = 'loading';
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.addressAddStatus = 'succeeded';
        state.addresses.push(action.payload);
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.addressAddStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
