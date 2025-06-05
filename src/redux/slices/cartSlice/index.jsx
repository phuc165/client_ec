// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Fetch the user's cart from the API
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://ecommerce-server-u4uh.onrender.com/api/v1/user/profile/cart');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
});

// Add an item to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async (cartItem, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://ecommerce-server-u4uh.onrender.com/api/v1/user/profile/cart', cartItem);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
});

// Update item quantity in the cart
export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, attributes, quantity }, { rejectWithValue }) => {
    try {
        const response = await axios.put('https://ecommerce-server-u4uh.onrender.com/api/v1/user/profile/cart', {
            productId,
            attributes,
            quantity,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update quantity');
    }
});

// Remove an item from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ productId, attributes }, { rejectWithValue }) => {
    try {
        const response = await axios.delete('https://ecommerce-server-u4uh.onrender.com/api/v1/user/profile/cart', {
            data: { productId, attributes },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
});

// Clear the cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.delete('https://ecommerce-server-u4uh.onrender.com/api/v1/user/profile/cart/clear');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Reset cart state
        resetCartState: (state) => {
            state.loading = false;
            state.error = null;
        },
        // Clear cart on logout
        clearCartState: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                // Ensure items is always an array
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Keep existing items on error
            })
            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update quantity
            .addCase(updateQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Clear cart
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = [];
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetCartState, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
