import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Search, User, Phone, Mail, CreditCard, Clock, CheckCircle } from 'lucide-react';

const EmployeeDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [customer, setCustomer] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            // Mock Müşteri Bulundu
            setCustomer({
                name: 'Orhan Bozgeyik', tc: '12345678901', segment: 'Platin',
                phone: '+90 555 123 4567', email: 'orhan@bank.com',
                products: ['Vadesiz TL', 'Kredi Kartı', 'Konut Kredisi'],
                lastInteractions: ['Dün - Çağrı Merkezi', '3 Gün Önce - Mobil Giriş']
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* ARAMA BAR */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-xl font-bold text-gray-800 mb-4">Müşteri Operasyonları</h1>
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="text"
                            placeholder="TC Kimlik, Müşteri No veya Telefon..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bank-primary outline-none"
                            value={searchTerm}
                            onChange={(e)=>setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="px-8">Sorgula</Button>
                </form>
            </div>

            {customer ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                    {/* SOL: Müşteri Profili */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="text-center relative overflow-hidden">
                            <div className="w-full h-24 bg-gradient-to-r from-bank-primary to-blue-600 absolute top-0 left-0"></div>
                            <div className="relative z-10 mt-12">
                                <div className="w-24 h-24 bg-white p-1 rounded-full mx-auto shadow-lg">
                                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                                        {customer.name.charAt(0)}
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mt-4">{customer.name}</h2>
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mt-2 inline-block">{customer.segment} Müşteri</span>

                                <div className="mt-6 text-left space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-3"><Phone size={16}/> {customer.phone}</div>
                                    <div className="flex items-center gap-3"><Mail size={16}/> {customer.email}</div>
                                    <div className="flex items-center gap-3"><User size={16}/> {customer.tc}</div>
                                </div>
                            </div>
                        </Card>

                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-3 text-sm">Hızlı Aksiyonlar</h3>
                            <div className="space-y-2">
                                <Button variant="secondary" className="w-full justify-start text-sm">Şifre Sıfırla</Button>
                                <Button variant="secondary" className="w-full justify-start text-sm">Kart Bloke Et</Button>
                                <Button variant="secondary" className="w-full justify-start text-sm">İletişim Bilgisi Güncelle</Button>
                            </div>
                        </div>
                    </div>

                    {/* SAĞ: Ürünler ve Geçmiş */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card title="Sahip Olduğu Ürünler">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {customer.products.map((p,i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="p-2 bg-white rounded shadow-sm"><CreditCard size={20} className="text-bank-primary"/></div>
                                        <span className="font-bold text-gray-700">{p}</span>
                                        <CheckCircle size={16} className="text-green-500 ml-auto"/>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card title="Son Etkileşimler">
                            <div className="space-y-4">
                                {customer.lastInteractions.map((act, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600 pb-3 border-b border-gray-50 last:border-0">
                                        <Clock size={16} className="text-gray-400"/>
                                        {act}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            ) : (
                // BOŞ DURUM
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <User size={48} className="mx-auto text-gray-300 mb-4"/>
                    <h3 className="text-lg font-bold text-gray-500">Müşteri Seçilmedi</h3>
                    <p className="text-gray-400">İşlem yapmak için yukarıdan müşteri sorgulayınız.</p>
                </div>
            )}
        </div>
    );
};

export default EmployeeDashboard;