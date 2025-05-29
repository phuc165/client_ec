// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { productId, attributes, quantity, productData } = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId === productId && JSON.stringify(item.attributes) === JSON.stringify(attributes),
            );
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ productId, attributes, quantity, productData });
            }
        },
        updateQuantity: (state, action) => {
            const { productId, attributes, quantity } = action.payload;
            const item = state.items.find((item) => item.productId === productId && JSON.stringify(item.attributes) === JSON.stringify(attributes));
            if (item && quantity >= 1) {
                item.quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            const { productId, attributes } = action.payload;
            state.items = state.items.filter(
                (item) => !(item.productId === productId && JSON.stringify(item.attributes) === JSON.stringify(attributes)),
            );
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
