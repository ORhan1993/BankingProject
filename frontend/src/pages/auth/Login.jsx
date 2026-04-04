import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { Lock, Mail, ArrowRight, ShieldCheck, UserPlus, Shield } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(async () => {
            try {
                const role = await login({ email, password });
                const dashboardMap = {
                    'CUSTOMER': '/customer/dashboard',
                    'ADMIN': '/admin/dashboard',
                    'MANAGER': '/manager/dashboard',
                    'EMPLOYEE': '/employee/dashboard'
                };
                navigate(dashboardMap[role] || '/');
            } catch (error) {
                alert("Giriş başarısız!");
            } finally {
                setLoading(false);
            }
        }, 800); // Gerçekçi his için bekleme
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* SOL TARAF: Görsel ve Marka */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 -ml-20 -mb-20"></div>

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-blue-500/30">
                        B
                    </div>
                    <h1 className="text-5xl font-bold leading-tight mb-6">Finansal Özgürlüğe <br/>Adım Atın.</h1>
                    <p className="text-gray-400 text-lg max-w-md">Yeni nesil bankacılık deneyimi ile varlıklarınızı güvenle yönetin, yatırımlarınızı büyütün.</p>
                </div>

                <div className="relative z-10 flex gap-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-green-400" /> 256-bit SSL Güvenliği
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div> Sistem Aktif
                    </div>
                </div>
            </div>

            {/* SAĞ TARAF: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 my-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-gray-800">Hoş Geldiniz</h2>
                        <p className="text-gray-500 mt-2 text-sm">Hesabınıza erişmek için bilgilerinizi girin.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">E-posta Adresi</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="orhan@bank.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-gray-700">Şifre</label>
                                <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">Şifremi Unuttum?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2" disabled={loading}>
                            {loading ? 'Giriş Yapılıyor...' : <>Giriş Yap <ArrowRight size={20} /></>}
                        </Button>
                    </form>

                    {/* Kayıt Olma Bölümü */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <div className="text-center mb-6">
                            <span className="text-sm font-medium text-gray-500 bg-white px-4 relative -top-3">Veya Yeni Hesap Oluşturun</span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {/* Müşteri Kaydı */}
                            <Link to="/register/customer" className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md hover:bg-blue-50 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <UserPlus size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-800">Müşteri Olun</h3>
                                        <p className="text-xs text-gray-500">Bireysel veya kurumsal hesap açın</p>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </Link>

                            {/* Yönetici Kaydı */}
                            <Link to="/register/admin" className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-md hover:bg-indigo-50 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <Shield size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-800">Personel / Yönetici Kaydı</h3>
                                        <p className="text-xs text-gray-500">Yetkili hesap başvurusu yapın</p>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;