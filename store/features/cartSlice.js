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
            const cartItem = state.cart.find((item) => item.product_id === payload.product_id);
            cartItem.quantity = String(payload.qty);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                if ('success' === action.payload?.status) {
                    state.cart = action.payload?.message?.items;
                }
                state.isLoading = false;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cart = [];
            })
            .addCase(addProductCart.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addProductCart.fulfilled, (state, action) => {
                if ('success' === action.payload.status) {
                    state.cart = action.payload.message.items;
                }
                state.isLoading = false;
            })
            .addCase(addProductCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cart = [];
            })

            .addCase(updateCart.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                if ('success' === action.payload.status) {
                    state.cart = action.payload.message.items;
                }
                state.isLoading = false;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.isLoading = false;
            })

            .addCase(removeCartProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(removeCartProduct.fulfilled, (state, action) => {
                if ('success' === action.payload.status) {
                    state.cart = action.payload.message.items;
                }
                state.isLoading = false;
            })
            .addCase(removeCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.cart = [];
            })
    },
});

export const { updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;