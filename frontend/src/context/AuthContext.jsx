// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

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
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(initialAuthState);

    const login = async (credentials) => {
        // Simüle edilmiş giriş mantığı
        const mockRoleMap = {
            'admin@bank.com': USER_ROLES.ADMIN,
            'orhan@bank.com': USER_ROLES.CUSTOMER,
            'manager@bank.com': USER_ROLES.MANAGER,
            'employee@bank.com': USER_ROLES.EMPLOYEE,
        };

        const simulatedRole = mockRoleMap[credentials.email] || USER_ROLES.CUSTOMER;

        setAuthState({
            isAuthenticated: true,
            user: { name: 'Kullanıcı', email: credentials.email },
            role: simulatedRole,
        });
        return simulatedRole;
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