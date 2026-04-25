import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();
    const location = useLocation();

    console.log(`[ProtectedRoute] Path: ${location.pathname}, isAuthenticated: ${isAuthenticated}, User Role: ${role}, Allowed Roles: ${allowedRoles}`);

    if (!isAuthenticated) {
        console.log(`[ProtectedRoute] Kullanıcı giriş yapmamış. Login'e yönlendiriliyor.`);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(role)) {
        console.log(`[ProtectedRoute] Yetkisiz erişim! Kullanıcının rolü (${role}) izin verilen roller (${allowedRoles}) arasında değil. Login'e yönlendiriliyor.`);
        // İsteğe bağlı: Yetkisiz erişim için özel bir sayfaya yönlendirilebilir.
        return <Navigate to="/login" replace />;
    }

    console.log(`[ProtectedRoute] Erişim izni verildi.`);
    return children;
};

export default ProtectedRoute;
