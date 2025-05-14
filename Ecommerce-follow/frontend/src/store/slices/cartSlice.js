import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const { isAuthenticated } = getState().auth;
      if (!isAuthenticated) {
        return rejectWithValue('User not authenticated');
      }

      const response = await api.get("/cart");
      return response.data.cartProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
    }
  }
);

// Async thunk for updating cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const { isAuthenticated } = getState().auth;
      if (!isAuthenticated) {
        return rejectWithValue('User not authenticated');
      }

      await api.put(`/cart/update/${productId}`, { quantity });
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart item');
    }
  }
);

// Async thunk for adding item to cart
export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity = 1 }, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const { isAuthenticated } = getState().auth;
      if (!isAuthenticated) {
        return rejectWithValue('User not authenticated');
      }

      const response = await api.post('/cart/add', { productId, quantity });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    updateStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    addStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCartItems
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;

        // Calculate total price
        let sum = 0;
        state.items.forEach((item) => {
          sum += item.price * item.quantity;
        });
        state.totalPrice = sum;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const { productId, quantity } = action.payload;
        const itemIndex = state.items.findIndex(item => item._id === productId);

        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = quantity;

          // Recalculate total price
          let sum = 0;
          state.items.forEach((item) => {
            sum += item.price * item.quantity;
          });
          state.totalPrice = sum;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload;
      })

      // Handle addToCart
      .addCase(addToCart.pending, (state) => {
        state.addStatus = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';

        // Check if the product is already in the cart
        const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);

        if (existingItemIndex !== -1) {
          // Update quantity if product already exists
          state.items[existingItemIndex].quantity += action.payload.quantity;
        } else {
          // Add new product to cart
          state.items.push(action.payload);
        }

        // Recalculate total price
        let sum = 0;
        state.items.forEach((item) => {
          sum += item.price * item.quantity;
        });
        state.totalPrice = sum;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
