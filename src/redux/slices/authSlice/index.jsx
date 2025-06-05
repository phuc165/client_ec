import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base URL for API calls
const baseUrl = 'https://ecommerce-server-u4uh.onrender.com/api/v1/user';

// Async thunk for user login
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Include cookies for authentication
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Login failed');
        }

        const userData = await response.json();
        return userData;
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
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Registration failed');
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Registration failed');
    }
});

// Async thunk for user logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            method: 'POST',
            credentials: 'include',
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
            credentials: 'include',
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
            credentials: 'include',
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

// Async thunk for getting user addresses
export const getAddresses = createAsyncThunk('auth/getAddresses', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/profile/addresses`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Failed to get addresses');
        }

        return await response.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to get addresses');
    }
});

// Async thunk for adding a new address
export const addAddress = createAsyncThunk('auth/addAddress', async (addressData, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/profile/addresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Failed to add address');
        }

        return await response.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to add address');
    }
});

// Async thunk for updating an address
export const updateAddress = createAsyncThunk('auth/updateAddress', async ({ addressId, addressData }, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/profile/addresses/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Failed to update address');
        }

        return await response.json();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to update address');
    }
});

// Async thunk for deleting an address
export const deleteAddress = createAsyncThunk('auth/deleteAddress', async (addressId, thunkAPI) => {
    try {
        const response = await fetch(`${baseUrl}/profile/addresses/${addressId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message || 'Failed to delete address');
        }

        return addressId; // Return the deleted address ID
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to delete address');
    }
});

// Get user info from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userInfo: userInfoFromStorage,
    addresses: [], // Array to store user addresses
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
            state.addresses = [];
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
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.userInfo = null;
                state.addresses = [];
                localStorage.removeItem('userInfo');
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                // Still clear credentials even if logout request fails
                state.userInfo = null;
                state.addresses = [];
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
            })
            // Get addresses reducers
            .addCase(getAddresses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add address reducers
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addresses.push(action.payload);
                state.success = true;
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Update address reducers
            .addCase(updateAddress.fulfilled, (state, action) => {
                const index = state.addresses.findIndex((addr) => addr._id === action.payload._id);
                if (index !== -1) {
                    state.addresses[index] = action.payload;
                }
                state.success = true;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete address reducers
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter((addr) => addr._id !== action.payload);
                state.success = true;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { setCredentials, clearCredentials, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
