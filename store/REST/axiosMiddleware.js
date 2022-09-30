import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import env from "../../constants/env"

axios.interceptors.request.use(
    async config => {

        config.baseURL = env.SITE_URL;

        const login_data = await AsyncStorage.getItem('login-data');
        if ('' !== login_data) {
            const { token } = JSON.parse(login_data)
            config.headers.Authorization = `Bearer ${token}`
        }

        const nonce_script = await AsyncStorage.getItem('nonce');
        if ('' !== nonce_script) {
            const { message } = JSON.parse(nonce_script)
            config.headers['X-WC-Store-API-Nonce'] = message
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
);

export default axios;