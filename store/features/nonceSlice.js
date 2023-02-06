import { createSlice } from '@reduxjs/toolkit'
import { getNonce } from '../REST/api'

export { getNonce };

const initialState = {
    nonce: '',
    isLoaded: false,
};

const nonceSlice = createSlice({
    name: 'nonce',
    initialState,
    reducers: {},
    extraReducers: {
        [getNonce.pending]: (state) => {
            if (!state.auth_status) {
                state.isLoaded = false;
            }
        },
        [getNonce.fulfilled]: (state, action) => {
            if ('success' === action.payload.status) {
                state.isLoaded = true;
                state.nonce = action.payload.message;
            } else {
                state.isLoaded = false;
                state.nonce = '';
            }
        },
        [getNonce.rejected]: (state) => {
            if (state.auth_status) {
                state.isLoaded = false;
                state.nonce = '';
            }
        },
    },
});

export default nonceSlice.reducer;