import axios from 'axios';

// API Gateway adresi artık Tailscale MagicDNS adresimiz
const API_BASE_URL = "http://softwarengineer.taild894da.ts.net:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor (İstek Yakalayıcı) JWT token'ı otomatik eklemek için
api.interceptors.request.use(
    (config) => {
        // localStorage'dan token'ı al
        const token = localStorage.getItem('token');
        
        // Eğer token varsa, her isteğin Authorization başlığına ekle
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
