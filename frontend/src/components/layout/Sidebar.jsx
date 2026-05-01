import React from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ menuItems = [], roleTitle = "Panel" }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-72 bg-[#0f172a] text-gray-300 flex flex-col h-screen shadow-2xl z-40 hidden md:flex font-sans">
            {/* Logo Alanı */}
            <div className="h-20 flex items-center px-8 border-b border-gray-800/50">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg shadow-blue-500/30">
                    B
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-wide">BankApp</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Premium</p>
                </div>
            </div>

            {/* Rol Başlığı */}
            <div className="px-8 py-6">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pl-2">
                    {roleTitle}
                </div>

                {/* Menü Linkleri */}
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1'
                                        : 'hover:bg-gray-800 hover:text-white hover:translate-x-1'
                                }`
                            }
                        >
              <span className={`mr-3 transition-colors ${ ({isActive}) => isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                {item.icon || <PieChart size={20} />}
              </span>
                            <span className="font-medium text-sm">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Alt Bölüm - Çıkış Butonu (Sidebar'da da olsun) */}
            <div className="mt-auto p-6 border-t border-gray-800/50">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors group"
                >
                    <LogOut size={20} className="mr-3 group-hover:rotate-12 transition-transform" />
                    Güvenli Çıkış
                </button>
                <p className="text-center text-[10px] text-gray-600 mt-4">v1.0.2 • Bank Corp</p>
            </div>
        </aside>
    );
};

export default Sidebar;