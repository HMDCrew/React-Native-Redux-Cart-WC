import { createSlice } from '@reduxjs/toolkit';
import { getProduct } from '../REST/api'

export { getProduct };

const initialState = {
    product: [],
    isLoading: true
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                if( "success" === action.payload?.status ) {
                    state.isLoading = false;
                    state.product = action.payload.message;
                }
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = true;
            })
    },
});

export default productSlice.reducer;