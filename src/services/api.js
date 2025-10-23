import axios from 'axios';

// Get the API URL from Redux store or use default
const getApiUrl = () => {
    // You can get this from Redux store or use environment variable
    return "http://192.168.1.68:8000";
};

// Create axios instance with default config
const api = axios.create({
    baseURL: getApiUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Unauthorized - redirect to login
            localStorage.removeItem('authToken');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const authAPI = {
    // User registration
    register: async (userData) => {
        try {
            const response = await api.post('/api/register/', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // User login
    login: async (credentials) => {
        try {
            const response = await api.post('/api/login/', credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // User logout
    logout: async () => {
        try {
            const response = await api.post('/api/logout/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

// Product API endpoints
export const productAPI = {
    // Get all products
    getProducts: async () => {
        try {
            const response = await api.get('/api/products/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create product
    createProduct: async (productData) => {
        try {
            const response = await api.post('/api/products/', productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update product
    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/api/products/${id}/`, productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/api/products/${id}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default api;
