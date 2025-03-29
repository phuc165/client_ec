import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for logging in
export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post('/api/users/login', { email, password }, config);

        // Store user in localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));

        return data;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userInfo');
            state.userInfo = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
