/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// interceptor for http
axiosServices.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem('user');
        let user = null;
        try {
            user = userStr && userStr !== 'undefined' ? JSON.parse(userStr) : null;
        } catch {
            user = null;
        }
        if (user && user.token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
/* axiosServices.interceptors.response.use(
    
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
); */

export default axiosServices;
