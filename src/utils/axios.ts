/**
 * axios setup to use mock service
 */

import { router } from '@/router';
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
axiosServices.interceptors.response.use(
    
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401)) {
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
        return Promise.reject(error);
    }

);

export default axiosServices;
