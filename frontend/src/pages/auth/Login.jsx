import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Navigate'i import ediyoruz
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { Lock, Mail, ArrowRight, ShieldCheck, Fingerprint, Building2, Users, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login, isAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Sadece login fonksiyonunu çağırıyoruz. Yönlendirme işini AppRouter yapacak.
            await login({ email, password });
        } catch (err) {
            setError(err.response?.data?.message || "E-posta veya şifre hatalı.");
        } finally {
            setLoading(false);
        }
    };

    // Eğer kullanıcı zaten giriş yapmışsa, bu sayfayı hiç gösterme, doğrudan yönlendir.
    if (isAuthenticated) {
        // AppRouter'daki mantık zaten yönlendireceği için burası bir ek güvenlik katmanı.
        // Genellikle kullanıcı /login adresine manuel gitmeye çalıştığında devreye girer.
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen flex bg-[#f8fafc]">
            {/* SOL TARAF: Kurumsal Marka Alanı */}
            <div className="hidden lg:flex lg:w-[45%] bg-[#020617] relative overflow-hidden flex-col justify-between p-14 text-white border-r border-gray-800">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -ml-40 -mb-40"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-3xl shadow-xl shadow-blue-900/50 border border-blue-400/20">
                            N
                        </div>
                        <span className="text-3xl font-extrabold tracking-tight">NeoBank<span className="text-blue-500">.</span></span>
                    </div>
                    
                    <h1 className="text-5xl font-bold leading-[1.15] mb-6">
                        Tek Noktadan <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            Güvenli Erişim.
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                        NeoBank Merkezi Kimlik Yönetimi ile bireysel, kurumsal ve personel hesaplarınıza en üst düzey güvenlik standartlarıyla bağlanın.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col gap-4 text-sm text-gray-300 w-max">
                    <div className="flex items-center gap-3 bg-gray-900/60 px-5 py-3 rounded-xl border border-gray-800/60 backdrop-blur-md">
                        <ShieldCheck size={20} className="text-blue-400" /> 
                        <span className="font-medium">Uçtan Uca 256-bit Şifreleme</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-900/60 px-5 py-3 rounded-xl border border-gray-800/60 backdrop-blur-md">
                        <Fingerprint size={20} className="text-indigo-400" /> 
                        <span className="font-medium">Biyometrik ve Akıllı Doğrulama Altyapısı</span>
                    </div>
                </div>
            </div>

            {/* SAĞ TARAF: Tekil ve Merkezi Form */}
            <div className="w-full lg:w-[55%] flex items-center justify-center p-8">
                <div className="w-full max-w-[440px]">
                    
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Merkezi Giriş</h2>
                        <p className="text-gray-500 mt-3 text-base">NeoBank ağına bağlanmak için bilgilerinizi girin.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {error && (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 flex items-center gap-3">
                                    <AlertCircle size={20} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-2.5">
                                <label className="text-sm font-semibold text-gray-700 ml-1">E-posta Adresi</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-medium"
                                        placeholder="ornek@neobank.com.tr"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-semibold text-gray-700">Şifre</label>
                                    <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                                        Şifremi Unuttum
                                    </a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-medium tracking-widest"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-14 mt-4 text-lg font-bold bg-gray-900 hover:bg-black text-white rounded-2xl shadow-xl shadow-gray-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Bağlanılıyor...</span>
                                    </div>
                                ) : (
                                    <>Güvenli Giriş Yap <ArrowRight size={20} /></>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Alt Yönlendirme */}
                    <div className="mt-10 grid grid-cols-2 gap-4">
                        <Link to="/register/customer" className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group cursor-pointer">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Users size={20} />
                            </div>
                            <span className="text-sm font-bold text-gray-900">Müşteri Olun</span>
                            <span className="text-xs text-gray-500 mt-1 text-center">Bireysel/Kurumsal</span>
                        </Link>

                        <Link to="/register/admin" className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group cursor-pointer">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Building2 size={20} />
                            </div>
                            <span className="text-sm font-bold text-gray-900">Personel Başvurusu</span>
                            <span className="text-xs text-gray-500 mt-1 text-center">IK ve Yönetim</span>
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400 font-medium">
                            © {new Date().getFullYear()} NeoBank A.Ş. Tüm hakları saklıdır.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
