import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ limit, skip, type }, { rejectWithValue }) => {
    try {
        let url;
        switch (type) {
            case 'flashSale': {
                url = `http://localhost:3000/api/v1/product/flashSale?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`;
                break;
            }
            case 'explore': {
                url = `http://localhost:3000/api/v1/product?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`;
                break;
            }
            case 'bestSeller': {
                url = `http://localhost:3000/api/v1/product/bestSeller?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price,sales`;
                break;
            }
            default:
                throw new Error('Invalid product type');
        }

        const response = await axios.get(url);
        const { data, total } = response.data;

        if (!Array.isArray(data)) {
            throw new Error('Invalid data format from API');
        }

        return { products: data, total, type };
    } catch (err) {
        return rejectWithValue(err.message || 'Failed to fetch products');
    }
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id, { rejectWithValue }) => {
    try {
        const url = `http://localhost:3000/api/v1/product/${id}`;
        const response = await axios.get(url);
        const product = response.data.data;

        if (!product || typeof product !== 'object') {
            throw new Error('Invalid product data from API');
        }

        return product;
    } catch (err) {
        return rejectWithValue(err.message || 'Failed to fetch product');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: {
            flashSale: [],
            explore: [],
            bestSeller: [],
        },
        singleProduct: null,
        loading: {
            flashSale: false,
            explore: false,
            bestSeller: false,
            singleProduct: false,
        },
        error: {
            flashSale: null,
            explore: null,
            bestSeller: null,
            singleProduct: null,
        },
        totalProducts: {
            flashSale: 0,
            explore: 0,
            bestSeller: 0,
        },
    },
    reducers: {
        clearProductState: (state) => {
            state.products = { flashSale: [], explore: [], bestSeller: [] };
            state.singleProduct = null;
            state.loading = { flashSale: false, explore: false, bestSeller: false, singleProduct: false };
            state.error = { flashSale: null, explore: null, bestSeller: null, singleProduct: null };
            state.totalProducts = { flashSale: 0, explore: 0, bestSeller: 0 };
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
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading.singleProduct = true;
                state.error.singleProduct = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading.singleProduct = false;
                state.singleProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading.singleProduct = false;
                state.error.singleProduct = action.payload;
            });
    },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
