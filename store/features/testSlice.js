import { createSlice } from '@reduxjs/toolkit';
import { getTest } from '../REST/api'

export { getTest };

const initialState = {
    isLoading: true
};

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTest.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getTest.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getTest.rejected, (state, action) => {
                state.isLoading = false;
            })
    },
});

export default testSlice.reducer;