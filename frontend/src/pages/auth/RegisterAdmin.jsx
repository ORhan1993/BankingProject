import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { User, Mail, Lock, ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import api from '../../api/axiosInstance'; // Merkezi API istemcimizi import ediyoruz

const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'EMPLOYEE' // Varsayılan yetkili rolü
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);
        
        try {
            // Yeni 'api' instance'ı ile istek atıyoruz
            const response = await api.post('/auth/register', formData);
            
            if (response.data && response.data.token) {
                setSuccessMsg("Personel hesabı başarıyla oluşturuldu! Lütfen kayıtlı e-postanız ile giriş yapın.");
                
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'EMPLOYEE'
                });
                
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err) {
            console.error("Kayıt hatası:", err);
            const errorMsg = err.response?.data?.message || err.response?.data || err.message || "Kayıt işlemi sırasında bir hata oluştu.";
            setError(typeof errorMsg === 'string' ? errorMsg : "Sunucu ile iletişim kurulamadı.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                <div className="mb-8 text-center relative">
                    <Link to="/login" className="absolute left-0 top-1 inline-flex items-center text-sm font-medium text-gray-400 hover:text-indigo-600 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Building2 size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Banka Personeli</h2>
                    <p className="text-gray-500 mt-2 text-sm">Yetkili personel hesabınızı oluşturun.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50/50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                        {error}
                    </div>
                )}
                
                {successMsg && (
                    <div className="mb-6 p-4 bg-green-50/50 border border-green-100 text-green-700 text-sm font-medium rounded-xl flex flex-col items-center justify-center text-center gap-2">
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <ArrowRight size={20} />
                        </div>
                        {successMsg}
                        <span className="text-xs text-green-600/70 mt-1 animate-pulse">Giriş sayfasına yönlendiriliyorsunuz...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Personel Rolü</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Building2 className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            </div>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-indigo-50/50 border border-indigo-100 text-indigo-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:bg-white transition-all font-semibold appearance-none"
                                required
                                disabled={successMsg !== null}
                            >
                                <option value="EMPLOYEE">Personel (Vezne)</option>
                                <option value="MANAGER">Şube Müdürü</option>
                                <option value="ADMIN">Sistem Yöneticisi</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Ad Soyad / Unvan</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            </div>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-medium"
                                placeholder="Ayşe Yılmaz"
                                required
                                disabled={successMsg !== null}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Banka E-posta Adresi</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            </div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-medium"
                                placeholder="ayse.yilmaz@neobank.com.tr"
                                required
                                disabled={successMsg !== null}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Şifre</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            </div>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-medium tracking-widest"
                                placeholder="••••••••"
                                required
                                minLength="6"
                                disabled={successMsg !== null}
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full h-14 mt-4 text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]" 
                        disabled={loading || successMsg !== null}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>İşleniyor...</span>
                            </div>
                        ) : (
                            <>Personel Ekle <ArrowRight size={20} /></>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterAdmin;
