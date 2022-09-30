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
    extraReducers: {
        [getTaxonomys.pending]: (state) => {
            state.isLoading = true;
        },
        [getTaxonomys.fulfilled]: (state, action) => {
            if( "success" === action.payload.status ) {
                state.isLoading = false;
                state.taxonomy = action.payload.message;
            }
        },
        [getTaxonomys.rejected]: (state) => {
            state.isLoading = true;
        },
    },
});

export default taxonomysSlice.reducer;