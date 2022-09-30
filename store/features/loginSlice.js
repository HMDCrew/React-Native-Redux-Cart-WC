import { createSlice } from '@reduxjs/toolkit'
import { getLoginToken, isAuth } from '../REST/api'

export { getLoginToken, isAuth };

const initialState = {
    token: '',
    user_display_name: '',
    user_email: '',
    user_nicename: '',
    auth_status: false,
    isLoading: true
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        componentLogin: (state, { payload }) => {
            if ("success" === payload.status) {
                state.token = payload.message.data.token;
                state.user_display_name = payload.message.data.display_name;
                state.user_email = payload.message.data.user_email;
                state.user_nicename = payload.message.data.user_nicename;
                state.auth_status = true;
                state.isLoading = false;
            }
        }
    },
    extraReducers: {
        [getLoginToken.pending]: (state) => {
            if( !state.auth_status ) {
                state.isLoading = true;
            }
        },
        [getLoginToken.fulfilled]: (state, action) => {
            if( !state.auth_status && action.payload.token ) {
                state.isLoading = false;
                state.auth_status = true;
                state.token = action.payload.token;
                state.user_display_name = action.payload.user_display_name;
                state.user_email = action.payload.user_email;
                state.user_nicename = action.payload.user_nicename;
            }
        },
        [getLoginToken.rejected]: (state) => {
            if( state.auth_status ) {
                state.isLoading = false;
                state.auth_status = false;
                state.token = '';
                state.user_display_name = '';
                state.user_email = '';
                state.user_nicename = '';
            }
        },

        [isAuth.pending]: (state) => {
            if( !state.auth_status ) {
                state.isLoading = true;
            }
        },
        [isAuth.fulfilled]: (state, action) => {
            if( !state.auth_status && action.payload.token ) {
                state.isLoading = false;
                state.auth_status = true;
                state.token = action.payload.token;
                state.user_display_name = action.payload.user_display_name;
                state.user_email = action.payload.user_email;
                state.user_nicename = action.payload.user_nicename;
            }
        },
        [isAuth.rejected]: (state) => {
            if( state.auth_status ) {
                state.isLoading = false;
                state.auth_status = false;
                state.token = '';
                state.user_display_name = '';
                state.user_email = '';
                state.user_nicename = '';
            }
        },
    },
});

export const { componentLogin } = loginSlice.actions;
export default loginSlice.reducer;