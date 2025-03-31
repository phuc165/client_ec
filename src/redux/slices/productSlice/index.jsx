// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ limit, skip, type }, { rejectWithValue }) => {
    try {
        let url;
        if (type === 'flashSale') {
            url = `http://localhost:3000/api/v1/product/flashSale?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`;
        } else if (type === 'explore') {
            url = `http://localhost:3000/api/v1/product?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`;
        } else {
            throw new Error('Invalid product type');
        }

        const response = await axios.get(url);
        const { data, total } = response.data;

        if (!Array.isArray(data)) {
            throw new Error('Invalid data format from API');
        }

        return { products: data, total, type }; // Include type in the payload
    } catch (err) {
        return rejectWithValue(err.message || 'Failed to fetch products');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: {
            flashSale: [],
            explore: [],
        },
        loading: {
            flashSale: false,
            explore: false,
        },
        error: {
            flashSale: null,
            explore: null,
        },
        totalProducts: {
            flashSale: 0,
            explore: 0,
        },
    },
    reducers: {
        clearProductState: (state) => {
            state.products = { flashSale: [], explore: [] };
            state.loading = { flashSale: false, explore: false };
            state.error = { flashSale: null, explore: null };
            state.totalProducts = { flashSale: 0, explore: 0 };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                const { type } = action.meta.arg;
                state.loading[type] = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const { products, total, type } = action.payload;
                state.loading[type] = false;
                state.products[type] = products;
                state.totalProducts[type] = total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                const { type } = action.meta.arg;
                state.loading[type] = false;
                state.error[type] = action.payload;
            });
    },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
