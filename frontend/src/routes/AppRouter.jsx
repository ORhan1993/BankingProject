// frontend/src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, CreditCard, Send, ShieldAlert, Briefcase, Settings as SettingsIcon, TrendingUp, Mail } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

import Login from '../pages/auth/Login';
import RegisterCustomer from '../pages/auth/RegisterCustomer';
import RegisterAdmin from '../pages/auth/RegisterAdmin';
import NotFound from '../pages/auth/NotFound';

import CustomerDashboard from '../pages/customer/Dashboard';
import Accounts from '../pages/customer/Accounts';
import Transfer from '../pages/customer/Transfer';
import LoanApply from '../pages/customer/LoanApply';

import AdminDashboard from '../pages/admin/Dashboard';
import UsersPage from '../pages/admin/Users';
import Logs from '../pages/admin/Logs';
import LocalMailbox from '../pages/admin/LocalMailbox'; // Yeni eklendi

import ManagerDashboard from '../pages/Manager/Dashboard';
import Approvals from '../pages/Manager/Approvals';

import EmployeeDashboard from '../pages/Employee/Dashboard';

import SettingsPage from '../pages/Settings';

// --- LAYOUT BİLEŞENLERİ ---

const CustomerLayout = () => {
    const menuItems = [
        { path: 'dashboard', name: 'Özet Ekran', icon: <LayoutDashboard size={20}/> },
        { path: 'accounts', name: 'Hesaplarım', icon: <CreditCard size={20}/> },
        { path: 'transfers', name: 'Para Transferi', icon: <Send size={20}/> },
        { path: 'loans', name: 'Kredi Başvurusu', icon: <TrendingUp size={20}/> },
        { path: 'settings', name: 'Ayarlar', icon: <SettingsIcon size={20}/> },
    ];
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar menuItems={menuItems} roleTitle="Müşteri Paneli" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="İnternet Şubesi" />
                <main className="flex-1 overflow-auto p-6 relative"><Outlet /></main>
            </div>
        </div>
    );
};

const AdminLayout = () => {
    const menuItems = [
        { path: 'dashboard', name: 'Yönetim Paneli', icon: <LayoutDashboard size={20}/> },
        { path: 'users', name: 'Kullanıcı Yönetimi', icon: <Users size={20}/> },
        { path: 'mailbox', name: 'Sistem Mailleri', icon: <Mail size={20}/> }, // Yeni eklendi
        { path: 'logs', name: 'Sistem Logları', icon: <Activity size={20}/> },
        { path: 'settings', name: 'Ayarlar', icon: <SettingsIcon size={20}/> },
    ];
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar menuItems={menuItems} roleTitle="Yönetici (Admin)" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Banka Yönetim Merkezi" />
                <main className="flex-1 overflow-auto p-6 relative"><Outlet /></main>
            </div>
        </div>
    );
};

const ManagerLayout = () => {
    const menuItems = [
        { path: 'dashboard', name: 'Şube Paneli', icon: <LayoutDashboard size={20}/> },
        { path: 'approvals', name: 'Onay Bekleyenler', icon: <ShieldAlert size={20}/> },
        { path: 'settings', name: 'Ayarlar', icon: <SettingsIcon size={20}/> },
    ];
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar menuItems={menuItems} roleTitle="Şube Müdürü" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Şube Yönetimi" />
                <main className="flex-1 overflow-auto p-6 relative"><Outlet /></main>
            </div>
        </div>
    );
};

const EmployeeLayout = () => {
    const menuItems = [
        { path: 'dashboard', name: 'Operasyon', icon: <Briefcase size={20}/> },
        { path: 'settings', name: 'Ayarlar', icon: <SettingsIcon size={20}/> },
    ];
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar menuItems={menuItems} roleTitle="Personel Paneli" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Operasyon Merkezi" />
                <main className="flex-1 overflow-auto p-6 relative"><Outlet /></main>
            </div>
        </div>
    );
};

const AppRouter = () => {
    const { isAuthenticated, role } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register/customer" element={<RegisterCustomer />} />
                <Route path="/register/admin" element={<RegisterAdmin />} />
                <Route path="/" element={isAuthenticated ? <Navigate to={`/${role?.toLowerCase()}/dashboard`} replace /> : <Navigate to="/login" replace />} />

                <Route path="/customer" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<CustomerDashboard />} />
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="transfers" element={<Transfer />} />
                    <Route path="loans" element={<LoanApply />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN', 'GENERAL_MANAGER']}><AdminLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="mailbox" element={<LocalMailbox />} /> {/* Yeni Eklendi */}
                    <Route path="logs" element={<Logs />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="/manager" element={<ProtectedRoute allowedRoles={['MANAGER', 'GENERAL_MANAGER']}><ManagerLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<ManagerDashboard />} />
                    <Route path="approvals" element={<Approvals />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="/employee" element={<ProtectedRoute allowedRoles={['EMPLOYEE']}><EmployeeLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<EmployeeDashboard />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;