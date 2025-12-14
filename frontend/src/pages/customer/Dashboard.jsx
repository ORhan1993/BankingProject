import React from 'react';
import Card from '../../components/common/Card';
import SimpleChart from '../../components/common/SimpleChart';
import Button from '../../components/common/Button';
import { TrendingUp, ArrowUpRight, ArrowDownLeft, Wallet, CreditCard, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
    const navigate = useNavigate();

    // Mock Data
    const chartData = [
        { name: 'Oca', Varlık: 250 }, { name: 'Şub', Varlık: 260 },
        { name: 'Mar', Varlık: 290 }, { name: 'Nis', Varlık: 280 },
        { name: 'May', Varlık: 310 }, { name: 'Haz', Varlık: 350 },
    ];

    return (
        <div className="space-y-8">
            {/* 1. Üst Kısım: Karşılama ve Hızlı Kart */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Sol: Finansal Özet Kartı (Modern Gradient) */}
                <div className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Toplam Varlıklarım</p>
                                <h1 className="text-4xl font-bold tracking-tight">₺310.500,00</h1>
                            </div>
                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                <Wallet className="text-white" size={24} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-lg border border-green-500/30">
                                <TrendingUp size={16} className="text-green-400" />
                                <span className="text-green-400 text-sm font-bold">+%12.5</span>
                            </div>
                            <span className="text-gray-400 text-sm self-center">Geçen aya göre</span>
                        </div>
                    </div>
                </div>

                {/* Sağ: Sanal Kart Görünümü */}
                <div className="w-full lg:w-96 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute bottom-0 right-0 opacity-10">
                        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#FFFFFF" d="M45,-76.2C58.9,-69.3,71.1,-59.1,79.8,-46.8C88.5,-34.5,93.6,-20.1,91.8,-6.3C90,7.5,81.3,20.7,71.6,32.2C61.9,43.7,51.2,53.5,39.3,61.4C27.4,69.3,14.3,75.3,0.5,74.5C-13.3,73.6,-26.6,66,-38.3,58C-50,50,-60.1,41.6,-68.6,30.7C-77.1,19.8,-84,6.4,-82.3,-6.2C-80.6,-18.8,-70.3,-30.6,-59.6,-40.3C-48.9,-50,-37.8,-57.6,-25.8,-66C-13.8,-74.4,-0.9,-83.6,12.7,-84.8C26.3,-86,31.1,-100.2,45,-76.2Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-lg font-bold tracking-widest">BANKA</span>
                            <CreditCard className="opacity-80" />
                        </div>
                        <div className="mt-4">
                            <p className="font-mono text-xl tracking-widest drop-shadow-md">**** **** **** 4291</p>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <p className="text-xs text-blue-200 uppercase">Kart Sahibi</p>
                                <p className="font-medium tracking-wide">ORHAN BOZGEYİK</p>
                            </div>
                            <div>
                                <p className="text-xs text-blue-200 uppercase text-right">SKT</p>
                                <p className="font-mono">12/28</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Grafik ve Hızlı İşlemler Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Varlık Analizi" className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-[300px] w-full mt-4">
                        <SimpleChart data={chartData} lineKey="Varlık" color="#4F46E5" />
                    </div>
                </Card>

                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Hızlı İşlemler</h3>
                    <div className="space-y-3 flex-1">
                        <button
                            onClick={() => navigate('/customer/transfers')}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all group"
                        >
                            <span className="font-medium">Para Gönder</span>
                            <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-blue-200 transition-colors">
                                <ArrowUpRight size={18} />
                            </div>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-all group">
                            <span className="font-medium">Fatura Öde</span>
                            <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-orange-200 transition-colors">
                                <Wallet size={18} />
                            </div>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-all group">
                            <span className="font-medium">QR ile Öde</span>
                            <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-purple-200 transition-colors">
                                <CreditCard size={18} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Son İşlemler (Modern Liste) */}
            <Card title="Son Hareketler" className="shadow-sm">
                <div className="space-y-4">
                    {[
                        { title: 'Ahmet Yılmaz', sub: 'EFT Transferi', amount: '-1.200,00 TL', date: 'Bugün', icon: <ArrowUpRight />, color: 'bg-red-100 text-red-600' },
                        { title: 'Maaş Ödemesi', sub: 'Şirket A.Ş.', amount: '+45.000,00 TL', date: 'Dün', icon: <ArrowDownLeft />, color: 'bg-green-100 text-green-600' },
                        { title: 'Netflix', sub: 'Abonelik', amount: '-299,99 TL', date: '12 Ara', icon: <CreditCard />, color: 'bg-purple-100 text-purple-600' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                                    {React.cloneElement(item.icon, { size: 18 })}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 group-hover:text-bank-primary transition-colors">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.sub}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-gray-800'}`}>{item.amount}</p>
                                <p className="text-xs text-gray-400">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <button className="text-sm text-bank-primary font-medium hover:underline">Tümünü Gör</button>
                </div>
            </Card>
        </div>
    );
};

export default CustomerDashboard;