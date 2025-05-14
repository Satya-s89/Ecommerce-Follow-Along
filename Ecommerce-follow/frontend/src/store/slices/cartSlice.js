import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
      if (!userData || !userData.token) {
        return rejectWithValue('User not authenticated');
      }
      
      const response = await axios.get("http://localhost:8080/cart", {
        headers: {
          Authorization: userData.token,
        },
      });
      
      return response.data.cartProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
    }
  }
);

// Async thunk for updating cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
      if (!userData || !userData.token) {
        return rejectWithValue('User not authenticated');
      }
      
      const response = await axios.put(
        `http://localhost:8080/cart/update/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: userData.token,
          },
        }
      );
      
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart item');
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
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
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
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
