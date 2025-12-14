import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Search, Edit, Trash2, UserPlus, Filter, MoreHorizontal } from 'lucide-react';

const initialUsers = [
    { id: 1, name: 'Orhan Bozgeyik', email: 'orhan@bank.com', role: 'CUSTOMER', status: 'ACTIVE', bg: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Ayşe Yılmaz', email: 'ayse@bank.com', role: 'MANAGER', status: 'ACTIVE', bg: 'bg-purple-100 text-purple-600' },
    { id: 3, name: 'Mehmet Demir', email: 'mehmet@bank.com', role: 'EMPLOYEE', status: 'PASSIVE', bg: 'bg-orange-100 text-orange-600' },
    { id: 4, name: 'Zeynep Kaya', email: 'zeynep@bank.com', role: 'CUSTOMER', status: 'BANNED', bg: 'bg-pink-100 text-pink-600' },
];

const Users = () => {
    const [users, setUsers] = useState(initialUsers);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kullanıcılar</h1>
                    <p className="text-gray-500 text-sm">Sistemdeki tüm kullanıcıları yönetin.</p>
                </div>
                <Button className="flex items-center gap-2 shadow-lg shadow-blue-500/30">
                    <UserPlus size={18} /> Yeni Kullanıcı
                </Button>
            </div>

            <Card className="overflow-hidden border-0 shadow-lg">
                {/* FİLTRE BAR */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="İsim, e-posta veya ID ile ara..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                        <Filter size={16}/> Filtrele
                    </button>
                </div>

                {/* MODERN TABLO */}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kullanıcı Bilgisi</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Yetki (Rol)</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${user.bg}`}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                      {user.role}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                            user.status === 'PASSIVE' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status === 'ACTIVE' ? 'Aktif' : user.status === 'PASSIVE' ? 'Pasif' : 'Yasaklı'}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Görsel) */}
                <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Toplam 4 kayıt gösteriliyor</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">Önceki</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50">Sonraki</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Users;