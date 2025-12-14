// frontend/src/routes/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Rol tabanlı erişim kontrolü sağlayan bileşen.
 * @param {string[]} allowedRoles - Bu rotaya erişebilecek roller.
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        // Oturum açılmamışsa, giriş sayfasına yönlendir
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Rol yetersizse, erişim reddedildi sayfasına veya dashboard'a yönlendir
        console.warn(`Erişim Engellendi: Rol (${role}) yetersiz.`);

        // Yönlendirmeyi kullanıcının mevcut rollerine göre yap (örnek olarak ana sayfaya)
        const redirectPath = `/${role.toLowerCase()}/dashboard`;
        return <Navigate to={redirectPath} replace />;
    }

    // Yetkili ise alt rotaları render et (Layout'un kendisini veya doğrudan sayfayı)
    return <Outlet />;
};

export default ProtectedRoute;