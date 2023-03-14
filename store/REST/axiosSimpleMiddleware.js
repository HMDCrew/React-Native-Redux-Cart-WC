import axios from 'axios'
import env from "../../constants/env"

axios.interceptors.request.use(
    async config => {

        config.baseURL = env.SITE_URL;

        config.headers.cookie = 'NO_CACHE=1;'
        config.headers['Cache-Control'] = 'no-cache';
        config.headers['Pragma'] = 'no-cache';
        config.headers['Expires'] = '0';

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