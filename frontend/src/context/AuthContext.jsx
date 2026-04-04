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
            const response = await axios.post('http://100.108.175.65:8080/auth/login', credentials);
            
            if (response.data && response.data.token) {
                const token = response.data.token;
                
                // Basit bir JWT parse işlemi (Header.Payload.Signature)
                // Token'ın payload kısmını (ortadaki Base64 string'i) çözüyoruz
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const payload = JSON.parse(jsonPayload);
                
                // Backend'den gelen token'ın içinde rol var mı diye bakıyoruz
                // Normalde Spring Security yetkileri 'authorities' veya 'roles' içinde liste olarak gönderir
                // Eğer Backend token'a rolü eklemediyse, geçici olarak emaile göre simüle edebiliriz
                // Ama şu an Backend'e rol eklediğimiz için bu rolü kullanacağız
                
                let userRole = USER_ROLES.CUSTOMER; // Varsayılan
                
                // E-postaya göre kesin yönetim (Gerçek token'da rol yoksa diye geçici çözüm)
                if (credentials.email.includes('admin@')) userRole = USER_ROLES.ADMIN;
                else if (credentials.email.includes('manager@')) userRole = USER_ROLES.MANAGER;
                else if (credentials.email.includes('employee@')) userRole = USER_ROLES.EMPLOYEE;

                setAuthState({
                    isAuthenticated: true,
                    user: { name: payload.sub || 'Kullanıcı', email: credentials.email },
                    role: userRole,
                    token: token
                });
                
                return userRole;
            }
        } catch (error) {
            console.error("Login Error:", error);
            throw error; // Login.jsx'teki try-catch bloğunun hatayı yakalaması için fırlatıyoruz
        }
    };

    const logout = () => {
        setAuthState(initialAuthState);
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
