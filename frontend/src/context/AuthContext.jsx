// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosInstance'; // Merkezi API istemcimizi import ediyoruz

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

    // Sayfa yenilendiğinde token'ı kontrol et
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp * 1000 > Date.now()) {
                    const userRole = payload.role ? payload.role.toUpperCase() : USER_ROLES.CUSTOMER;
                    setAuthState({
                        isAuthenticated: true,
                        user: { name: payload.sub, email: payload.sub },
                        role: userRole,
                        token: token
                    });
                    // Sayfa yenilendiğinde de token'ı axios header'ına ekle
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Invalid token found in localStorage", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            
            if (response.data && response.data.token) {
                const token = response.data.token;
                localStorage.setItem('token', token); 

                const payload = JSON.parse(atob(token.split('.')[1]));
                const userRole = payload.role ? payload.role.toUpperCase() : USER_ROLES.CUSTOMER;

                setAuthState({
                    isAuthenticated: true,
                    user: { name: payload.sub, email: credentials.email },
                    role: userRole,
                    token: token
                });
                
                // Axios'a varsayılan header olarak JWT token'ı ekle
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                return userRole;
            }
        } catch (error) {
            console.error("Login Error:", error);
            // ÇÖZÜM: Hatayı yakalayıp tekrar fırlatıyoruz ki Login.jsx bunu yakalasın
            throw error; 
        }
    };

    const logout = () => {
        localStorage.removeItem('token'); 
        // Axios header'ından token'ı sil
        delete api.defaults.headers.common['Authorization'];
        setAuthState(initialAuthState);
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
