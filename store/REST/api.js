import { createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from './axiosMiddleware'

// AsyncStorage.removeItem('login-data')
// AsyncStorage.removeItem('nonce')

const auth_user_mixer = async (args) => {

    const login_data = await AsyncStorage.getItem('login-data');

    if (null !== login_data) {
        const { user_id } = JSON.parse(login_data)
        return { ...args, user_id }
    }

    return {
        'status': 'error',
        'message': 'local auth error',
    };
}

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
 * Test api requests
 */
export const getTest = createAsyncThunk('wp/test', async () => {

    return await axios.get("wp-json/wpr-test-route").then((response) => {

        // console.log(response.data)

        return response.data
    })
});


/**
 * Auth section
 */
export const getLoginToken = createAsyncThunk('store/login', async ({ user, passwd }) => {

    const login_data = await AsyncStorage.getItem('login-data');

    // console.log(login_data)

    if (null !== login_data) {

        return JSON.parse(login_data);

    } else {
        return await axios.post("wp-json/jwt-auth/v1/token", {
            username: user,
            password: passwd
        }).then((response) => {
            AsyncStorage.setItem('login-data', JSON.stringify(response.data))
            return response.data
        }).catch((error) => error.response.data);
    }
});


export const isAuth = createAsyncThunk('store/auth', async () => {

    const login_data = await AsyncStorage.getItem('login-data');

    //console.log(login_data)

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
        }).catch((error) => error.response.data);
    }
});


/**
 * API Product
 */
export const getProduct = createAsyncThunk('store/product', async (id) => {

    return await axios.post("wp-json/wpr-get-product", {
        product_id: id
    }).then((response) => response.data)
        .catch((error) => error.response.data);
});


/**
 * API Cart
 */
export const getCart = createAsyncThunk('store/cart', async () => {
    return await axios.post("wp-json/wpr-get-cart",
        await auth_user_mixer({}))
        .then((response) => response.data)
        .catch((error) => error.response);
});


/**
 * API Add Product Cart
 */
export const addProductCart = createAsyncThunk('store/cart/add/product', async ({ id, qty }) => {
    return await axios.post("wp-json/wpr-add-to-cart",
        await auth_user_mixer({
            product_id: id,
            qty: qty
        }))
        .then((response) => response.data)
        .catch((error) => error.response.data);
});


/**
 * API Update Cart
 */
export const updateCart = createAsyncThunk('store/cart/update', async (cart) => {
    return await axios.post("wp-json/wpr-update-cart",
        await auth_user_mixer({
            cart
        }))
        .then((response) => response.data)
        .catch((error) => error.response.data);
});


/**
 * API Remove Cart Product
 */
export const removeCartProduct = createAsyncThunk('store/cart/remove/product', async (cart_prod_key) => {
    return await axios.post("wp-json/wc/store/cart/remove-item/",
        await auth_user_mixer({
            key: cart_prod_key
        }))
        .then((response) => response.data)
        .catch((error) => error.json());
});


/**
 * API Chackout get Fields
 */
export const getChackoutFields = createAsyncThunk('store/chackout/fields', async () => {
    return await axios.get("wp-json/wpr-chackout-fields")
        .then((response) => response.data)
        .catch((error) => error.json());
});


/**
 * API Chackout get Payments
 */
export const getPayments = createAsyncThunk('store/chackout/payments', async () => {
    return await axios.get("wp-json/wpr-payment-gateway")
        .then((response) => response.data)
        .catch((error) => error.json());
});


/**
 * API create new Order
 */
export const createOrder = createAsyncThunk('store/order/new', async ({ cart, form_fields }) => {
    return await axios.post("wp-json/wpr-create-order",
        await auth_user_mixer({
            cart, form_fields
        }))
        .then((response) => response.data)
        .catch((error) => error.json());
});
