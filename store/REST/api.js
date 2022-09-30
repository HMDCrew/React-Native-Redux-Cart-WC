import { createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from './axiosMiddleware'

// AsyncStorage.removeItem('login-data')

/**
 * Nonce for api requests 
 */
export const getNonce = createAsyncThunk('store/nonce', async () => {

    return await axios.get("wp-json/wpr-get-nonce").then((response) => {
        if ('success' === response.data.status) {
            AsyncStorage.setItem('nonce', JSON.stringify(response.data))
        }
        return response.data
    })
});


/**
 * Auth section
 */
export const getLoginToken = createAsyncThunk('store/login', async ({ user, passwd }) => {

    const login_data = await AsyncStorage.getItem('login-data');

    if (null !== login_data) {

        return JSON.parse(login_data);

    } else {
        return await axios.post("wp-json/jwt-auth/v1/token", {
            username: user,
            password: passwd
        }).then((response) => {
            AsyncStorage.setItem('login-data', JSON.stringify(response.data))
            return response.data
        })
    }
});

export const isAuth = createAsyncThunk('store/auth', async () => {

    const login_data = await AsyncStorage.getItem('login-data');

    if (null !== login_data) {
        return JSON.parse(login_data);
    }

    return false;
});


/**
 * API Menu
 */
export const getTaxonomys = createAsyncThunk('store/taxonomy', async () => {

    const taxonomyMenu = await AsyncStorage.getItem('taxonomyMenu');

    if (null !== taxonomyMenu) {

        return JSON.parse(taxonomyMenu);

    } else {
        return await axios.post("wp-json/wpr-get-taxonomy", {
            taxonomy: 'product_cat',
            hide_empty: '1',
        }).then((response) => {
            AsyncStorage.setItem('taxonomyMenu', JSON.stringify(response.data))
            return response.data
        }).catch((error) => error.json());
    }
});


/**
 * API Product
 */
export const getProduct = createAsyncThunk('store/product', async (id) => {

    return await axios.post("wp-json/wpr-get-product", {
        product_id: id
    }).then((response) => response.data)
        .catch((error) => error.json());

});


/**
 * API Cart
 */
export const getCart = createAsyncThunk('store/cart', async () => {

    return await axios.get("wp-json/wc/store/cart/items/", {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
    })
        .then((response) => response.data)
        .catch((error) => error.json());

    return false;
});


/**
 * API Add Product Cart
 */
export const addProductCart = createAsyncThunk('store/cart/add/product', async ({ id, qty }) => {

    return await axios.post("wp-json/wc/store/cart/add-item/", {
        id: id,
        quantity: qty
    })
        .then((response) => response.data)
        .catch((error) => error.json());

    return false;
});


/**
 * API Update Cart
 */
export const updateCart = createAsyncThunk('store/cart/update', async (cart) => {

    return await axios.post("wp-json/wpr-update-cart", {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
        cart
    })
        .then((response) => response.data)
        .catch((error) => error.json());

    return false;
});


/**
 * API Remove Cart Product
 */
export const removeCartProduct = createAsyncThunk('store/cart/remove/product', async (cart_prod_key) => {

    return await axios.post("wp-json/wc/store/cart/remove-item/", {
        key: cart_prod_key
    })
        .then((response) => response.data)
        .catch((error) => error.json());

    return false;
});


/**
 * API Chackout get Payments
 */
export const getPayments = createAsyncThunk('store/chackout/payments', async () => {

    return await axios.get("wp-json/wc/v3/payment_gateways")
        .then((response) => { console.log(response.data); return response.data })
        .catch((error) => { console.log(error); return error.json() });

    return false;
});
