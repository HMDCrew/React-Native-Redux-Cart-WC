import { createSlice } from '@reduxjs/toolkit'
import { getPayments } from '../REST/api'

export { getPayments };

const initialState = {
    payments: [],
    isLoaded: true
};

const chackoutSlice = createSlice({
    name: 'chackout',
    initialState,
    reducers: {},
    extraReducers: {
        [getPayments.pending]: (state) => {
            state.isLoaded = false;
            console.log('action')
        },
        [getPayments.fulfilled]: (state, action) => {
            state.isLoaded = true;
            console.log(action)
        },
        [getPayments.rejected]: (state) => {
            state.isLoaded = true;
            console.log('action')
        },
    },
});

export default chackoutSlice.reducer;