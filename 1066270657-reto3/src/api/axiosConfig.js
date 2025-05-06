import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/backend-lis/api/activities',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error en la petición:', error);
        return Promise.reject(error);
    }
);

export default api; 