import { createSlice } from '@reduxjs/toolkit'
import { getChackoutFields, getPayments, createOrder } from '../REST/api'

export { getChackoutFields, getPayments, createOrder };

const initialState = {
    fields: [],
    payments: [],
    order: [],
    missingOrderField: [],
    isLoaded: false,
    isLoadedFields: false,
};

const chackoutSlice = createSlice({
    name: 'chackout',
    initialState,
    reducers: {},
    extraReducers: {
        [getPayments.pending]: (state) => {
            state.isLoaded = false;
        },
        [getPayments.fulfilled]: (state, action) => {
            state.isLoaded = true;
            if ('success' === action.payload.status) {
                state.payments = action.payload.message
            } else {
                state.payments = []
            }
        },
        [getPayments.rejected]: (state) => {
            state.isLoaded = true;
            state.payments = []
        },


        [getChackoutFields.pending]: (state) => {
            state.isLoadedFields = false;
        },
        [getChackoutFields.fulfilled]: (state, action) => {
            state.isLoadedFields = true;
            if ('success' === action.payload.status) {
                state.fields = action.payload.message
            } else {
                state.fields = []
            }
        },
        [getChackoutFields.rejected]: (state) => {
            state.isLoadedFields = true;
            state.fields = []
        },


        [createOrder.pending]: (state) => {
            state.isOrderCreated = false;
            state.order = [];
        },
        [createOrder.fulfilled]: (state, action) => {
            if ('success' === action.payload.status) {
                state.isOrderCreated = true;
                state.order = action.payload.message;
            } else if ("missing fields" === action.payload.message) {
                state.isOrderCreated = false;
                state.order = [];
                state.missingOrderField = action.payload.fields;
            }
        },
        [createOrder.rejected]: (state) => {
            state.isOrderCreated = false;
            state.order = [];
        },
    },
});

export default chackoutSlice.reducer;