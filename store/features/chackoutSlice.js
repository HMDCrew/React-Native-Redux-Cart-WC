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
    extraReducers: (builder) => {
        builder
            .addCase(getPayments.pending, (state, action) => {
                state.isLoaded = false;
            })
            .addCase(getPayments.fulfilled, (state, action) => {
                state.isLoaded = true;
                // console.log(action.payload)
                if ('success' === action.payload.status) {
                    state.payments = action.payload.message
                } else {
                    state.payments = []
                }
            })
            .addCase(getPayments.rejected, (state, action) => {
                state.isLoaded = true;
                state.payments = []
            })

            .addCase(getChackoutFields.pending, (state, action) => {
                state.isLoadedFields = false;
            })
            .addCase(getChackoutFields.fulfilled, (state, action) => {
                state.isLoadedFields = true;
                if ('success' === action.payload.status) {
                    state.fields = action.payload.message
                } else {
                    state.fields = []
                }
            })
            .addCase(getChackoutFields.rejected, (state, action) => {
                state.isLoadedFields = true;
                state.fields = []
            })

            .addCase(createOrder.pending, (state, action) => {
                state.isOrderCreated = false;
                state.order = [];
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                console.log(action.payload)
                if ('success' === action.payload.status) {
                    state.isOrderCreated = true;
                    state.order = action.payload.message;
                } else if ("missing fields" === action.payload.message) {
                    state.isOrderCreated = false;
                    state.order = [];
                    state.missingOrderField = action.payload.fields;
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isOrderCreated = false;
                state.order = [];
            })
    },
});

export default chackoutSlice.reducer;