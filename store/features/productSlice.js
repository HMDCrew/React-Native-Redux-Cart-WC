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
    extraReducers: {
        [getProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [getProduct.fulfilled]: (state, action) => {
            if( "success" === action.payload.status ) {
                state.isLoading = false;
                state.product = action.payload.message;
            }
        },
        [getProduct.rejected]: (state) => {
            state.isLoading = true;
        },
    },
});

export default productSlice.reducer;