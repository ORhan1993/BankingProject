import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Plus, Search, Download, ArrowUpRight, ArrowDownLeft, Wallet, CreditCard, MoreVertical } from 'lucide-react';

const accounts = [
    { id: 1, type: 'Vadesiz TL', iban: 'TR12 ... 1234', balance: '12.450,00', currency: '₺', bg: 'bg-gradient-to-br from-gray-900 to-gray-800', text: 'text-white' },
    { id: 2, type: 'Birikim Hesabı', iban: 'TR45 ... 9876', balance: '2.300,00', currency: '€', bg: 'bg-white border border-gray-200', text: 'text-gray-800' },
    { id: 3, type: 'Altın Hesabı', iban: 'TR99 ... 1122', balance: '45,00', currency: 'Gr', bg: 'bg-gradient-to-br from-yellow-500 to-yellow-600', text: 'text-white' },
];

const transactions = [
    { id: 1, title: 'Starbucks', date: 'Bugün, 09:41', amount: '-124,00 ₺', type: 'out', category: 'Yeme & İçme' },
    { id: 2, title: 'Maaş Ödemesi', date: 'Dün, 17:30', amount: '+45.000,00 ₺', type: 'in', category: 'Gelir' },
    { id: 3, title: 'Netflix', date: '12 Ara', amount: '-299,99 ₺', type: 'out', category: 'Abonelik' },
    { id: 4, title: 'Ahmet Yılmaz', date: '10 Ara', amount: '-1.500,00 ₺', type: 'out', category: 'Transfer' },
];

const Accounts = () => {
    const [selectedId, setSelectedId] = useState(1);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Hesaplarım & Varlıklar</h1>
                <Button className="flex items-center gap-2 bg-black hover:bg-gray-800"><Plus size={18}/> Yeni Hesap</Button>
            </div>

            {/* HESAP KARTLARI CAROUSEL */}
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {accounts.map((acc) => (
                    <div
                        key={acc.id}
                        onClick={() => setSelectedId(acc.id)}
                        className={`min-w-[320px] h-[190px] rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-xl ${acc.bg} ${selectedId === acc.id ? 'ring-4 ring-blue-500/20 scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className={`text-sm opacity-80 ${acc.text}`}>{acc.type}</p>
                                <p className={`text-xs opacity-60 mt-1 font-mono ${acc.text}`}>{acc.iban}</p>
                            </div>
                            <div className={`p-2 rounded-lg bg-opacity-10 bg-white`}>
                                <Wallet size={20} className={acc.text} />
                            </div>
                        </div>
                        <div>
                            <p className={`text-3xl font-bold tracking-tight ${acc.text}`}>{acc.balance} <span className="text-lg font-normal">{acc.currency}</span></p>
                        </div>
                    </div>
                ))}
                {/* Yeni Hesap Ekle Kartı (Placeholder) */}
                <div className="min-w-[100px] flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors">
                    <Plus size={32} />
                </div>
            </div>

            {/* DETAY VE HAREKETLER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sol Taraf: Hesap Detayları */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Hesap Hareketleri" headerIcon={<CreditCard size={20}/>} headerColor="bg-blue-100 text-blue-600">
                        <div className="flex gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                                <input type="text" placeholder="Harcama ara..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"/>
                            </div>
                            <button className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100"><Download size={20} className="text-gray-600"/></button>
                        </div>

                        <div className="space-y-1">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl group transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {tx.type === 'in' ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{tx.title}</p>
                                            <p className="text-xs text-gray-500">{tx.category} • {tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${tx.type === 'in' ? 'text-green-600' : 'text-gray-800'}`}>{tx.amount}</p>
                                        <p className="text-xs text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Dekont</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sağ Taraf: İstatistikler */}
                <div className="space-y-6">
                    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-500/20">
                        <h3 className="font-bold text-lg mb-1">Aylık Özet</h3>
                        <p className="text-blue-100 text-sm mb-6">Aralık 2025</p>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="opacity-80">Gelen</span>
                                    <span className="font-bold">+45.000 ₺</span>
                                </div>
                                <div className="w-full bg-blue-500/50 rounded-full h-1.5"><div className="bg-white w-[80%] h-full rounded-full"></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="opacity-80">Giden</span>
                                    <span className="font-bold">-18.450 ₺</span>
                                </div>
                                <div className="w-full bg-blue-500/50 rounded-full h-1.5"><div className="bg-blue-200 w-[40%] h-full rounded-full"></div></div>
                            </div>
                        </div>
                    </div>

                    <Card title="Hızlı Limitler">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-600">KMH Limiti</span>
                            <span className="font-bold text-gray-800">20.000 ₺</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600">Kredi Kartı</span>
                            <span className="font-bold text-gray-800">150.000 ₺</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Accounts;