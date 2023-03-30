import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import env from "../../constants/env"

axios.interceptors.request.use(
    async config => {

        config.baseURL = env.SITE_URL;

        config.headers.cookie = 'NO_CACHE=1;'
        config.headers['Cache-Control'] = 'no-cache';
        config.headers['Pragma'] = 'no-cache';
        config.headers['Expires'] = '0';

        const login_data = await AsyncStorage.getItem('login-data');
        if (null !== login_data) {
            const { jwt } = JSON.parse(login_data)
            config.headers.Authorization = `Bearer ${jwt}`
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
);

axios.interceptors.response.use(response => {
    return response;
}, (error) => {
    return Promise.reject(error.response);
});

export default axios;