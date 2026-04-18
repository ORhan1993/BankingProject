import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Search, Edit, Trash2, UserPlus, Filter, Shield, User, Loader2 } from 'lucide-react';
import api from '../../api/axiosInstance'; // Merkezi API istemcimizi import ediyoruz

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Kullanıcıları Backend'den Çekme İşlemi
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            // Yeni 'api' instance'ı ile istek atıyoruz
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (err) {
            console.error("Kullanıcıları çekerken hata:", err);
            setError("Kullanıcı listesi alınamadı. Lütfen yetkinizi kontrol edin.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Kullanıcı Silme İşlemi
    const handleDelete = async (id, name) => {
        if (!window.confirm(`${name} isimli kullanıcıyı silmek istediğinize emin misiniz?`)) return;
        
        try {
            // Yeni 'api' instance'ı ile istek atıyoruz
            await api.delete(`/users/${id}`);
            alert("Kullanıcı başarıyla silindi.");
            setUsers(users.filter(u => u.id !== id)); // Listeyi arayüzde güncelle
        } catch (err) {
            alert("Silme işlemi başarısız oldu.");
            console.error("Silme hatası:", err);
        }
    };

    // Arama Filtresi
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Rastgele Renk Üretici (Profil simgesi için)
    const getAvatarColor = (role) => {
        if (role === 'ADMIN') return 'bg-purple-100 text-purple-700';
        if (role === 'MANAGER') return 'bg-indigo-100 text-indigo-700';
        if (role === 'EMPLOYEE') return 'bg-teal-100 text-teal-700';
        return 'bg-blue-100 text-blue-700';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kullanıcı Yönetimi</h1>
                    <p className="text-gray-500 text-sm">Sistemdeki tüm müşteri ve personelleri yönetin.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={fetchUsers} className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200">
                        Yenile
                    </Button>
                    <Button className="flex items-center gap-2 shadow-lg shadow-blue-500/30">
                        <UserPlus size={18} /> Yeni Kullanıcı
                    </Button>
                </div>
            </div>

            <Card className="overflow-hidden border-0 shadow-lg">
                {/* FİLTRE BAR */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="İsim, e-posta veya yetki ile ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* HATA VEYA YÜKLENİYOR DURUMU */}
                {loading && (
                    <div className="p-12 flex flex-col items-center justify-center text-gray-500">
                        <Loader2 size={32} className="animate-spin text-blue-500 mb-4" />
                        Veriler sunucudan çekiliyor...
                    </div>
                )}
                
                {error && !loading && (
                    <div className="p-8 text-center text-red-500 bg-red-50">
                        {error}
                    </div>
                )}

                {/* MODERN TABLO */}
                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kullanıcı Bilgisi</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">NeoBank ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Yetki (Rol)</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlemler</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Arama kriterlerine uygun kullanıcı bulunamadı.</td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                                    
                                    {/* KULLANICI BİLGİSİ */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 ${getAvatarColor(user.role)}`}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {/* MÜŞTERİ ID */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                            {user.customerId}
                                        </span>
                                    </td>
                                    
                                    {/* ROL / YETKİ */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full border ${
                                            user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                            user.role === 'CUSTOMER' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            'bg-indigo-50 text-indigo-700 border-indigo-200'
                                        }`}>
                                            {user.role === 'CUSTOMER' ? <User size={12}/> : <Shield size={12}/>}
                                            {user.role}
                                        </span>
                                    </td>
                                    
                                    {/* İŞLEMLER */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                                                <Edit size={16}/>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(user.id, user.name)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                                title="Sil"
                                            >
                                                <Trash2 size={16}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ALT BİLGİ */}
                {!loading && !error && (
                    <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                        <span>Toplam <span className="font-bold text-gray-800">{filteredUsers.length}</span> kayıt listeleniyor</span>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Users;
