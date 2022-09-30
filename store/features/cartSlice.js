import { createSlice } from '@reduxjs/toolkit'
import { getCart, addProductCart, updateCart, removeCartProduct } from '../REST/api'

export { getCart, addProductCart, updateCart, removeCartProduct };

const initialState = {
    cart: [],
    isLoading: true
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateQuantity: (state, { payload }) => {
            const cartItem = state.cart.find((item) => item.id === payload.id);
            cartItem.quantity = String(payload.qty);
        },
    },
    extraReducers: {
        [getCart.pending]: (state) => {
            state.isLoading = true;
        },
        [getCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
        },
        [getCart.rejected]: (state) => {
            state.isLoading = false;
            state.cart = [];
        },

        [addProductCart.pending]: (state) => {
            state.isLoading = true;
        },
        [addProductCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cart = action.payload.items;
        },
        [addProductCart.rejected]: (state) => {
            state.isLoading = false;
            state.cart = [];
        },

        [updateCart.pending]: (state) => {
            state.isLoading = true;
        },
        [updateCart.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateCart.rejected]: (state) => {
            state.isLoading = false;
        },

        [removeCartProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [removeCartProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cart = action.payload.items;
        },
        [removeCartProduct.rejected]: (state) => {
            state.isLoading = false;
            state.cart = [];
        },
    },
});

export const { updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;