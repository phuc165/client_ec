import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base URL for API calls
const baseUrl = 'http://localhost:3000/api/v1/user';

// Async thunk for user login
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Login failed');
        }

        return await response.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
});

// Async thunk for user registration
export const register = createAsyncThunk('auth/register', async ({ name, email, password }, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Registration failed');
        }

        return await response.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Registration failed');
    }
});

// Async thunk for user logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            method: 'POST',
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Logout failed');
        }

        return await response.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Logout failed');
    }
});

// Async thunk for getting user profile
export const getUserProfile = createAsyncThunk('auth/getUserProfile', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/profile`, {
            method: 'GET',
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Failed to get profile');
        }

        return await response.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to get profile');
    }
});

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (userData, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Update failed');
        }

        return await response.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Update failed');
    }
});

// Get user info from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearCredentials: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login reducers
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register reducers
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout reducers
            .addCase(logout.fulfilled, (state) => {
                state.userInfo = null;
                localStorage.removeItem('userInfo');
            })
            // Get profile reducers
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update profile reducers
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.success = true;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCredentials, clearCredentials, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
