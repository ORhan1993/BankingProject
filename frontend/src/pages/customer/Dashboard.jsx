import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
    Wallet, 
    ArrowUpRight, 
    ArrowDownLeft, 
    RefreshCw, 
    Plus, 
    CreditCard, 
    Activity, 
    AlertCircle, 
    Loader2 
} from 'lucide-react';

const Dashboard = () => {
    const [wallets, setWallets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth(); // AuthContext'ten giriş yapmış kullanıcının bilgilerini al

    const fetchUserData = useCallback(async () => {
        // Eğer kullanıcı bilgisi henüz AuthContext tarafından yüklenmediyse, API isteği yapma.
        if (!user?.email) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // İki API isteğini aynı anda (paralel) gönderiyoruz.
            const [walletResponse, txResponse] = await Promise.all([
                api.get(`/wallets/my-wallets`).catch(err => {
                    console.warn("Cüzdanlar çekilemedi (Backend henüz hazır olmayabilir):", err);
                    return { data: [] }; // Hata durumunda boş veri dönerek uygulamanın çökmesini engelle
                }),
                api.get(`/payments/transactions`).catch(err => {
                    console.warn("İşlemler çekilemedi (Backend henüz hazır olmayabilir):", err);
                    return { data: { content: [] } }; // Hata durumunda boş veri dön
                })
            ]);

            setWallets(walletResponse.data || []);
            setTransactions(txResponse.data.content || txResponse.data || []);
            
        } catch (err) {
            console.error("Dashboard veri yükleme hatası:", err);
            setError("Veriler yüklenirken bir hata oluştu. Lütfen bağlantınızı kontrol edin.");
        } finally {
            setLoading(false);
        }
    }, [user?.email]); // KESİN ÇÖZÜM: Bağımlılığı objenin tamamı yerine, değişmeyen ilkel bir değere (email string'i) bağladık.

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // İşlem durumuna göre rozet (badge) rengini belirle
    const getStatusBadge = (status) => {
        switch (status) {
            case 'COMPLETED':
            case 'SUCCESS':
                return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">Tamamlandı</span>;
            case 'FAILED':
                return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full border border-red-200">Başarısız</span>;
            case 'PENDING':
                return <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">Bekliyor</span>;
            default:
                return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border border-gray-200">{status}</span>;
        }
    };

    // İşlem tipine göre ikon ve renk belirle
    const getTransactionIcon = (type) => {
        switch (type) {
            case 'DEPOSIT': 
                return <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><ArrowDownLeft size={20} /></div>;
            case 'WITHDRAWAL': 
                return <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><ArrowUpRight size={20} /></div>;
            case 'TRANSFER': 
                return <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><RefreshCw size={20} /></div>;
            default: 
                return <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center"><Activity size={20} /></div>;
        }
    };

    const getTransactionTypeName = (type) => {
        switch (type) {
            case 'DEPOSIT': return 'Para Yatırma';
            case 'WITHDRAWAL': return 'Para Çekme';
            case 'TRANSFER': return 'Para Transferi';
            case 'FX_TRADE': return 'Döviz İşlemi';
            default: return type;
        }
    };

    return (
        <div className="space-y-6">
            
            {/* ÜST BİLGİ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Hoş Geldiniz, <span className="text-blue-600">{user?.name?.split('@')[0] || 'Değerli Müşterimiz'}</span> 👋
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Hesaplarınızın ve son işlemlerinizin güncel özeti aşağıdadır.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchUserData} className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-medium border border-gray-200">
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> Yenile
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-colors font-medium shadow-lg shadow-blue-500/30">
                        <Plus size={18} /> Yeni Hesap
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {/* BAKIYE KARTLARI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse h-36">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    ))
                ) : wallets && wallets.length > 0 ? (
                    wallets.map((wallet) => (
                        wallet.balances.map((b, index) => (
                            <div key={`${wallet.walletId}-${index}`} className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-xl shadow-blue-900/20 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                                <div className="relative z-10 flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 text-blue-100 font-medium text-sm">
                                        <Wallet size={16} /> Mevcut Bakiye
                                    </div>
                                    <div className="bg-white/20 px-2 py-1 rounded text-xs font-bold tracking-wider">
                                        {b.currency}
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-3xl font-bold tracking-tight">
                                        {b.balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-blue-200 text-xs mt-3 flex items-center gap-1">
                                        <CreditCard size={12} /> Cüzdan No: <span className="font-mono">{wallet.iban || wallet.walletId}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))
                ) : (
                    <div className="col-span-full bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
                            <Wallet size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Henüz bir hesabınız yok</h3>
                        <p className="text-gray-500 text-sm mt-1 max-w-sm">Sisteme yeni katıldınız. İşlem yapabilmek için hemen ücretsiz bir cüzdan (hesap) oluşturun.</p>
                        <button className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                            Hesap Aç
                        </button>
                    </div>
                )}
            </div>

            {/* HIZLI İŞLEMLER */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Hızlı İşlemler</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group border border-transparent hover:border-blue-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform">
                            <ArrowDownLeft size={24} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Para Yatır</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group border border-transparent hover:border-blue-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform">
                            <ArrowUpRight size={24} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Para Çek</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group border border-transparent hover:border-blue-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform">
                            <RefreshCw size={24} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Transfer</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group border border-transparent hover:border-blue-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform">
                            <CreditCard size={24} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Kartlarım</span>
                    </button>
                </div>
            </div>

            {/* SON HAREKETLER TABLOSU */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Son Hesap Hareketleri</h2>
                    <button className="text-sm text-blue-600 font-medium hover:underline">Tümünü Gör</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlem</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Açıklama</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Tutar</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        <Loader2 className="animate-spin mx-auto mb-2 text-blue-500" size={24} />
                                        İşlem geçmişi yükleniyor...
                                    </td>
                                </tr>
                            ) : transactions && transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                {getTransactionIcon(tx.transactionType)}
                                                <span className="font-semibold text-gray-800">{getTransactionTypeName(tx.transactionType)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-800">{new Date(tx.transactionDate).toLocaleDateString('tr-TR')}</div>
                                            <div className="text-xs text-gray-500">{new Date(tx.transactionDate).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                            {tx.description || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className={`font-bold ${tx.transactionType === 'DEPOSIT' ? 'text-green-600' : tx.transactionType === 'WITHDRAWAL' ? 'text-red-600' : 'text-gray-800'}`}>
                                                {tx.transactionType === 'DEPOSIT' ? '+' : tx.transactionType === 'WITHDRAWAL' ? '-' : ''}
                                                {tx.originalAmount?.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) || tx.amount} {tx.originalCurrency || tx.currency}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {getStatusBadge(tx.status)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Activity size={48} className="mb-3 text-gray-200" />
                                            <p className="text-base text-gray-500 font-medium">Henüz bir işlem kaydı bulunmuyor.</p>
                                            <p className="text-sm mt-1">Hesabınızda hareket olduğunda burada listelenecektir.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
