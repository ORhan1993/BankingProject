import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, User, ChevronDown, Settings, CreditCard, X } from 'lucide-react';

const Header = ({ title }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    // Dışarı tıklayınca kapanma
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
            if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Mock Bildirimler
    const notifications = [
        { id: 1, title: 'Kredi Onaylandı', text: 'İhtiyaç kredisi başvurunuz onaylandı.', time: '10 dk önce', read: false },
        { id: 2, title: 'Güvenlik Uyarısı', text: 'Hesabınıza yeni bir cihazdan giriş yapıldı.', time: '1 saat önce', read: false },
        { id: 3, title: 'Kampanya', text: 'Faiz oranları düştü! Hemen inceleyin.', time: 'Dün', read: true },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
            </div>

            <div className="flex items-center gap-4">
                {/* BİLDİRİM MERKEZİ */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className={`p-2 rounded-full relative transition-all ${isNotifOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>

                    {isNotifOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in-down origin-top-right z-50">
                            <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 text-sm">Bildirimler</h3>
                                <button className="text-xs text-blue-600 hover:underline">Tümünü Oku</button>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map(n => (
                                    <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-blue-50/30' : ''}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-sm font-semibold ${!n.read ? 'text-blue-700' : 'text-gray-700'}`}>{n.title}</span>
                                            <span className="text-[10px] text-gray-400">{n.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-2">{n.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* PROFİL MENÜSÜ (Önceki Adımda Yaptığımızın Aynısı - Korumak İçin) */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:opacity-80 transition-opacity"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800 leading-none">{user?.name || 'Kullanıcı'}</p>
                            <p className="text-xs text-gray-500 mt-1">{user?.role}</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-bank-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                            {user?.name ? user.name.charAt(0) : <User size={20} />}
                        </div>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in-down origin-top-right z-50">
                            <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                <p className="text-sm text-gray-500">Oturum Açıldı</p>
                                <p className="text-sm font-semibold text-gray-800 truncate">{user?.email}</p>
                            </div>
                            <button onClick={() => navigate(`/${user.role.toLowerCase()}/settings`)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-bank-primary transition-colors">
                                <Settings size={16} /> Ayarlar
                            </button>
                            <div className="border-t border-gray-50 mt-1 pt-1">
                                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                    <LogOut size={16} /> Çıkış Yap
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;