import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/allproducts");
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Async thunk for fetching user's products
export const fetchUserProducts = createAsyncThunk(
  'products/fetchUserProducts',
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get("http://localhost:8080/allproducts");
      const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
      
      if (!userData || !userData.id) {
        return rejectWithValue('User not authenticated');
      }
      
      const userProducts = response.data.products.filter(
        (product) => product.userId === userData.id
      );
      
      return userProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user products');
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    userProducts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    userProductsStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAllProducts
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Handle fetchUserProducts
      .addCase(fetchUserProducts.pending, (state) => {
        state.userProductsStatus = 'loading';
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.userProductsStatus = 'succeeded';
        state.userProducts = action.payload;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.userProductsStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
