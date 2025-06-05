import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategory = createAsyncThunk('categories/fetchCategory', async ({ type }, { rejectWithValue }) => {
    try {
        let url;
        switch (type) {
            case 'category': {
                url = `https://ecommerce-server-u4uh.onrender.com/api/v1/category`;
                break;
            }
            default:
                throw new Error('Invalid category type');
        }

        const response = await axios.get(url);
        const { data } = response.data;

        if (!Array.isArray(data)) {
            throw new Error('Invalid data format from API');
        }

        return { categories: data, type }; // Include type in the payload
    } catch (err) {
        return rejectWithValue(err.message || 'Failed to fetch categories');
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: {
            category: [],
        },
        loading: {
            category: false,
        },
        error: {
            category: null,
        },
    },
    reducers: {
        clearCategoryState: (state) => {
            state.category = { category: [] };
            state.loading = { category: false };
            state.error = { category: null };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state, action) => {
                const { type } = action.meta.arg;
                state.loading[type] = true;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                const { categories, type } = action.payload;
                state.loading[type] = false;
                state.category[type] = categories;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                const { type } = action.meta.arg;
                state.loading[type] = false;
                state.error[type] = action.payload;
            });
    },
});

export const { clearCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
