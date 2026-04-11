// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Kullanıcı Rolleri
export const USER_ROLES = {
    ADMIN: 'ADMIN',
    GENERAL_MANAGER: 'GENERAL_MANAGER',
    MANAGER: 'MANAGER',
    EMPLOYEE: 'EMPLOYEE',
    CUSTOMER: 'CUSTOMER',
    GUEST: 'GUEST',
};

const AuthContext = createContext();

// Başlangıç Durumu
const initialAuthState = {
    isAuthenticated: false,
    user: null,
    role: USER_ROLES.GUEST,
    token: null
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(initialAuthState);

    const login = async (credentials) => {
        try {
            // Gerçek API'ye istek atıyoruz (Gateway üzerinden Payment Service'e)
            // CORS problemlerini en aza indirmek için config içine headers ekliyoruz
            const response = await axios.post('http://100.108.175.65:8080/auth/login', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data && response.data.token) {
                const token = response.data.token;
                
                // JWT payload kısmını (Base64) çözüp içindeki 'role' bilgisini alıyoruz
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const payload = JSON.parse(jsonPayload);
                
                // Backend'den (JwtService'den) gelen rolü okuyoruz.
                // Eğer okuyamazsak (eski token vs.) CUSTOMER varsayıyoruz
                let userRole = payload.role ? payload.role.toUpperCase() : USER_ROLES.CUSTOMER;

                // Giriş başarılı, context'i güncelle
                setAuthState({
                    isAuthenticated: true,
                    user: { name: payload.sub || 'Kullanıcı', email: credentials.email },
                    role: userRole,
                    token: token
                });
                
                // Axios'a varsayılan header olarak JWT token'ı ekle. 
                // Bundan sonra atılacak tüm api isteklerinde bu token otomatik gidecek!
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                return userRole;
            }
        } catch (error) {
            console.error("Login Error:", error);
            throw error; 
        }
    };

    const logout = () => {
        setAuthState(initialAuthState);
        // Çıkış yapıldığında axios header'ından token'ı sil
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
