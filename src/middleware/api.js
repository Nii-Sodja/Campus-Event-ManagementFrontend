import axios from 'axios';

// Force production URL when deployed
const BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://campus-event-management-backend.vercel.app';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('User'));
        if (user?.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        console.log('Making request to:', {
            baseURL: config.baseURL,
            url: config.url,
            method: config.method,
            fullUrl: `${config.baseURL}${config.url}`
        });
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error:', {
                status: error.response.status,
                url: error.config?.url,
                message: error.response.data?.message || error.message
            });
        } else if (error.request) {
            console.error('Network Error:', {
                url: error.config?.url,
                baseURL: error.config?.baseURL,
                message: 'Unable to reach the server'
            });
        }
        return Promise.reject(error);
    }
);

export default api;