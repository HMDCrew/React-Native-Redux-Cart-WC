import { configureStore } from '@reduxjs/toolkit';

import taxonomyMenuSlice from './features/taxonomyMenuSlice';
import productSlice from './features/productSlice';
import loginSlice from './features/loginSlice'
import cartSlice from './features/cartSlice';
import chackoutSlice from './features/chackoutSlice';
import nonceSlice from './features/nonceSlice';
import testSlice from './features/testSlice';

export const store = configureStore({
    reducer: {
        test: testSlice,
        chackout: chackoutSlice,
        nonce: nonceSlice,
        login: loginSlice,
        menu: taxonomyMenuSlice,
        product: productSlice,
        cart: cartSlice,
    },
});