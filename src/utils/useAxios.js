import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', 

    // baseURL: 'https://natureza365.onrender.com', 
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token'); 

        if (token) {
            config.headers.Authorization = `${token}`;
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;