// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosInstance';

export const USER_ROLES = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    EMPLOYEE: 'EMPLOYEE',
    CUSTOMER: 'CUSTOMER',
    GUEST: 'GUEST',
};

const AuthContext = createContext();

const initialAuthState = {
    isAuthenticated: false,
    user: null,
    role: USER_ROLES.GUEST,
    token: null
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(initialAuthState);

    useEffect(() => {
        console.log("[AuthContext] Sayfa yüklendi, token kontrol ediliyor...");
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp * 1000 > Date.now()) {
                    const userRole = payload.role ? payload.role.toUpperCase() : USER_ROLES.CUSTOMER;
                    console.log("[AuthContext] Geçerli token bulundu. Kullanıcı:", payload.sub, "Rol:", userRole);
                    setAuthState({
                        isAuthenticated: true,
                        user: { name: payload.sub, email: payload.sub },
                        role: userRole,
                        token: token
                    });
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } else {
                    console.log("[AuthContext] Süresi geçmiş token bulundu, siliniyor.");
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("[AuthContext] Geçersiz token, siliniyor.", error);
                localStorage.removeItem('token');
            }
        } else {
            console.log("[AuthContext] Token bulunamadı. Misafir olarak devam ediliyor.");
        }
    }, []);

    const login = async (credentials) => {
        console.log("[AuthContext] Login fonksiyonu çağrıldı. E-posta:", credentials.email);
        try {
            const response = await api.post('/auth/login', credentials);
            
            if (response.data && response.data.token) {
                const token = response.data.token;
                localStorage.setItem('token', token); 

                const payload = JSON.parse(atob(token.split('.')[1]));
                const userRole = payload.role ? payload.role.toUpperCase() : USER_ROLES.CUSTOMER;
                console.log("[AuthContext] API'den token alındı. Kullanıcı:", payload.sub, "Rol:", userRole);

                console.log("[AuthContext] State güncelleniyor...");
                setAuthState({
                    isAuthenticated: true,
                    user: { name: payload.sub, email: credentials.email },
                    role: userRole,
                    token: token
                });
                
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                console.log("[AuthContext] State güncellendi. Yeni rol:", userRole);
                return userRole;
            }
        } catch (error) {
            console.error("[AuthContext] Login API hatası:", error);
            throw error; 
        }
    };

    const logout = () => {
        console.log("[AuthContext] Logout çağrıldı.");
        localStorage.removeItem('token'); 
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
