// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ProductCard from '../../../components/ProductCard';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ limit, skip }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/v1/product?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`,
        );

        const { data, total } = response.data;

        if (!Array.isArray(data)) {
            throw new Error('Invalid data format from API');
        }

        const validProducts = data.map((product) => ({
            id: product.id || product._id,
            title: product.name,
            price: product.actual_price,
            discountedPrice: product.discount_price,
            rating: product.ratings,
            reviews: product.no_of_ratings,
            images: product.image,
        }));

        return { products: validProducts, total };
    } catch (err) {
        return rejectWithValue(err.message || 'Failed to fetch products');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
        totalProducts: 0,
    },
    reducers: {
        clearProductState: (state) => {
            state.products = [];
            state.loading = false;
            state.error = null;
            state.totalProducts = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalProducts = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
