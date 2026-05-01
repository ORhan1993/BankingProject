import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { User, Lock, Bell, Shield, Smartphone } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profil Bilgileri', icon: <User size={18} /> },
        { id: 'security', label: 'Güvenlik & Şifre', icon: <Lock size={18} /> },
        { id: 'notifications', label: 'Bildirimler', icon: <Bell size={18} /> },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Hesap Ayarları</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* SOL MENU */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <Card className="p-2">
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-50 text-bank-primary'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </Card>
                </div>

                {/* SAĞ İÇERİK */}
                <div className="flex-1">
                    {activeTab === 'profile' && (
                        <Card title="Kişisel Bilgiler">
                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">O</div>
                                <div>
                                    <h3 className="font-bold text-lg">Orhan Bozgeyik</h3>
                                    <p className="text-gray-500 text-sm">Müşteri No: 4421932</p>
                                    <button className="text-blue-600 text-sm font-medium hover:underline mt-1">Fotoğrafı Değiştir</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Ad Soyad" defaultValue="Orhan Bozgeyik" />
                                <Input label="E-posta" defaultValue="orhan@bank.com" />
                                <Input label="Telefon" defaultValue="+90 555 123 45 67" />
                                <Input label="TC Kimlik No" defaultValue="12*******90" disabled className="bg-gray-100 opacity-70" />
                            </div>
                            <div className="mt-6 text-right">
                                <Button>Değişiklikleri Kaydet</Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card title="Güvenlik Ayarları">
                            <div className="space-y-6">
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex gap-3 items-start">
                                    <Shield className="text-yellow-600 mt-1" size={20} />
                                    <div>
                                        <h4 className="font-bold text-yellow-800 text-sm">İki Faktörlü Doğrulama (2FA)</h4>
                                        <p className="text-yellow-700 text-xs mt-1">Hesabınız şu an SMS doğrulaması ile korunmaktadır. Google Authenticator ekleyerek güvenliğinizi artırın.</p>
                                    </div>
                                    <button className="ml-auto text-sm font-bold text-yellow-800 hover:underline">Kur</button>
                                </div>

                                <hr className="border-gray-100" />

                                <form className="max-w-md">
                                    <h4 className="font-bold text-gray-800 mb-4">Şifre Değiştir</h4>
                                    <Input label="Mevcut Şifre" type="password" />
                                    <Input label="Yeni Şifre" type="password" />
                                    <Input label="Yeni Şifre (Tekrar)" type="password" />
                                    <Button variant="secondary" className="mt-2">Şifreyi Güncelle</Button>
                                </form>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'notifications' && (
                        <Card title="Bildirim Tercihleri">
                            <div className="space-y-4">
                                {[
                                    { title: 'Hesap Hareketleri', desc: 'Para giriş çıkışlarında bildirim al.' },
                                    { title: 'Kampanyalar', desc: 'Yeni kredi ve faiz oranlarından haberdar ol.' },
                                    { title: 'Güvenlik Uyarıları', desc: 'Farklı cihazdan giriş yapıldığında uyar.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Smartphone size={20}/></div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                                                <p className="text-gray-500 text-xs">{item.desc}</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={i !== 1} />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;