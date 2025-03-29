// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk('orders/createOrder', async (order, { getState, rejectWithValue }) => {
    try {
        const {
            auth: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/orders', order, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

export const getOrderDetails = createAsyncThunk('orders/getOrderDetails', async (id, { getState, rejectWithValue }) => {
    try {
        const {
            auth: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        order: {},
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetOrder: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
