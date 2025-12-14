// src/components/layout/CustomerLayout.jsx (Tailwind CSS kullanılarak profesyonel tasarım)
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const customerMenuItems = [
    { path: 'dashboard', name: 'Özet Ekran' },
    { path: 'accounts', name: 'Hesaplarım' },
    { path: 'transfer', name: 'Para Transferi' },
    { path: 'loans', name: 'Kredi Başvurusu' },
];

const CustomerLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* 1. Modüler Sidebar (Menü) */}
            <Sidebar menuItems={customerMenuItems} role="Müşteri" />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* 2. Modüler Header (Üst Menü ve Kullanıcı Bilgisi) */}
                <Header title="Uluslararası Bankacılık" userName="Orhan BOZGEYİK" />

                {/* 3. Ana İçerik Alanı (Kullanıcı Dostu, Bol Beyaz Alan) */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
                    <div className="container mx-auto">
                        {/* Router ile gelen sayfa buraya yerleşir */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CustomerLayout;