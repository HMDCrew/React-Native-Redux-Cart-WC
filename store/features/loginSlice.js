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
            if (payload?.success) {
                state.token = payload.jwt;
                state.user_display_name = payload.user.display_name;
                state.user_email = payload.user.user_email;
                state.user_nicename = payload.user.user_nicename;
                state.auth_status = true;
                state.isLoading = false;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoginToken.pending, (state, action) => {
                if (!state.auth_status) {
                    state.isLoading = true;
                }
            })
            .addCase(getLoginToken.fulfilled, (state, action) => {
                if (!state.auth_status && action.payload?.jwt) {
                    state.isLoading = false;
                    state.auth_status = true;
                    state.token = action.payload.jwt;
                    state.user_display_name = action.payload.user_display_name;
                    state.user_email = action.payload.user_email;
                    state.user_nicename = action.payload.user_nicename;
                }
            })
            .addCase(getLoginToken.rejected, (state, action) => {
                if (state.auth_status) {
                    state.isLoading = false;
                    state.auth_status = false;
                    state.token = '';
                    state.user_display_name = '';
                    state.user_email = '';
                    state.user_nicename = '';
                }
            })
            .addCase(isAuth.pending, (state, action) => {
                if (!state.auth_status) {
                    state.isLoading = true;
                }
            })
            .addCase(isAuth.fulfilled, (state, action) => {
                if (!state.auth_status && action.payload?.jwt) {
                    state.isLoading = false;
                    state.auth_status = true;
                    state.token = action.payload.jwt;
                    state.user_display_name = action.payload.user_login;
                    state.user_email = action.payload.user_email;
                    state.user_nicename = action.payload.user_nicename;
                }
            })
            .addCase(isAuth.rejected, (state, action) => {
                if (state.auth_status) {
                    state.isLoading = false;
                    state.auth_status = false;
                    state.token = '';
                    state.user_display_name = '';
                    state.user_email = '';
                    state.user_nicename = '';
                }
            })
    },
});

export const { componentLogin } = loginSlice.actions;
export default loginSlice.reducer;