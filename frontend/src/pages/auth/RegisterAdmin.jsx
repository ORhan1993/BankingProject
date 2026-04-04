import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { User, Mail, Lock, ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import axios from 'axios';

const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'EMPLOYEE' // Varsayılan yetkili rolü
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            // API Gateway üzerinden Backend'e istek atıyoruz
            const response = await axios.post('http://100.108.175.65:8080/auth/register', formData);
            
            if (response.data && response.data.token) {
                alert("Personel hesabı başarıyla oluşturuldu! Lütfen giriş yapın.");
                navigate('/login');
            }
        } catch (err) {
            console.error("Kayıt hatası:", err);
            setError(err.response?.data?.message || "Kayıt işlemi sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-8">
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-6">
                        <ArrowLeft size={16} className="mr-1" /> Geri Dön
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">Banka Personeli</h2>
                    <p className="text-gray-500 mt-2 text-sm">Yetkili personel hesabınızı oluşturun.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Personel Rolü</label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium"
                                required
                            >
                                <option value="EMPLOYEE">Personel (Vezne)</option>
                                <option value="MANAGER">Şube Müdürü</option>
                                <option value="ADMIN">Sistem Yöneticisi</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Ad Soyad / Unvan</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="Ayşe Yılmaz"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Banka E-posta Adresi</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="ayse.yilmaz@bank.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Şifre</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="••••••••"
                                required
                                minLength="6"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 mt-6" disabled={loading}>
                        {loading ? 'İşleniyor...' : <>Personel Ekle <ArrowRight size={20} /></>}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterAdmin;