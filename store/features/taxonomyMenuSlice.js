import { createSlice } from '@reduxjs/toolkit';
import { getTaxonomys } from '../REST/api'

export { getTaxonomys };

const initialState = {
    taxonomy: {},
    isLoading: true
};

const taxonomysSlice = createSlice({
    name: 'taxonomys',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTaxonomys.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getTaxonomys.fulfilled, (state, action) => {
                if( "success" === action.payload?.status ) {
                    state.taxonomy = action.payload.message;
                }
                state.isLoading = false;
            })
            .addCase(getTaxonomys.rejected, (state, action) => {
                state.isLoading = true;
            })
    },
});

export default taxonomysSlice.reducer;