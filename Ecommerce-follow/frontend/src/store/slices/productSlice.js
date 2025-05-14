import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/allproducts");
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
      // Check if user is authenticated
      const { isAuthenticated, user } = getState().auth;
      if (!isAuthenticated || !user || !user.id) {
        return rejectWithValue('User not authenticated');
      }

      const response = await api.get("/allproducts");

      const userProducts = response.data.products.filter(
        (product) => product.userId === user.id
      );

      return userProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user products');
    }
  }
);

// Async thunk for adding a new product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const { isAuthenticated } = getState().auth;
      if (!isAuthenticated) {
        return rejectWithValue('User not authenticated');
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);

      if (productData.images && productData.images.length > 0) {
        for (let i = 0; i < productData.images.length; i++) {
          formData.append('images', productData.images[i]);
        }
      }

      const response = await api.post("/product/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
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
    addProductStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
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
      })

      // Handle addProduct
      .addCase(addProduct.pending, (state) => {
        state.addProductStatus = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductStatus = 'succeeded';
        state.userProducts.push(action.payload);
        state.allProducts.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
