// src/redux/slices/timerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTimers = createAsyncThunk('timers/fetchTimers', async ({ type }, { rejectWithValue }) => {
    try {
        let url;
        switch (type) {
            case 'flashSaleTimer': {
                url = `https://ecommerce-server-u4uh.onrender.com/api/v1/timer/flashSaleTimer`;
                break;
            }
            case 'saleOffProductTimer': {
                url = `https://ecommerce-server-u4uh.onrender.com/api/v1/timer/saleOffProductTimer`;
                break;
            }
            default:
                throw new Error('Invalid slice type');
        }

        const response = await axios.get(url);
        const { data } = response.data;
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format from API');
        }

        return { timers: data, type }; // Include type in the payload
    } catch (err) {
        return rejectWithValue(err.message || 'Failed to fetch timers');
    }
});

const timerSlice = createSlice({
    name: 'timers',
    initialState: {
        timers: {
            flashSaleTimer: [],
            saleOffProduct: [],
        },
        loading: {
            flashSaleTimer: false,
            saleOffProduct: false,
        },
        error: {
            flashSaleTimer: null,
            saleOffProduct: null,
        },
    },
    reducers: {
        clearTimerState: (state) => {
            state.timers = { flashSaleTimer: [], saleOffProduct: [] };
            state.loading = { flashSaleTimer: false, saleOffProduct: false };
            state.error = { flashSaleTimer: null, saleOffProduct: null };
            state.totalTimers = { flashSaleTimer: 0, saleOffProduct: 0 };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimers.pending, (state, action) => {
                const { type } = action.meta.arg;
                state.loading[type] = true;
            })
            .addCase(fetchTimers.fulfilled, (state, action) => {
                const { timers, type } = action.payload;
                state.loading[type] = false;
                state.timers[type] = timers;
            })
            .addCase(fetchTimers.rejected, (state, action) => {
                const { type } = action.meta.arg;
                state.loading[type] = false;
                state.error[type] = action.payload;
            });
    },
});

export const { clearTimerState } = timerSlice.actions;
export default timerSlice.reducer;
