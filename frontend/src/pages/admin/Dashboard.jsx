import React from 'react';
import Card from '../../components/common/Card';
import SimpleChart from '../../components/common/SimpleChart';
import { Users, Activity, ShieldAlert, Database, Server, Cpu } from 'lucide-react';

const userGrowthData = [
    { name: 'Oca', Users: 1200 }, { name: 'Şub', Users: 1350 },
    { name: 'Mar', Users: 1600 }, { name: 'Nis', Users: 1900 },
    { name: 'May', Users: 2400 }, { name: 'Haz', Users: 3100 },
];

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            {/* BAŞLIK ALANI */}
            <div className="bg-[#1e293b] text-white p-8 rounded-2xl shadow-lg mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Sistem Durumu</h1>
                    <p className="text-gray-400">Sunucular aktif, tüm servisler %99.9 uptime ile çalışıyor.</p>
                </div>
            </div>

            {/* METRİK KARTLARI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-blue-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={24}/></div>
                        <div>
                            <p className="text-sm text-gray-500">Toplam Kullanıcı</p>
                            <h3 className="text-2xl font-bold text-gray-800">3,100</h3>
                        </div>
                    </div>
                </Card>
                <Card className="border-l-4 border-green-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Activity size={24}/></div>
                        <div>
                            <p className="text-sm text-gray-500">Günlük İşlem</p>
                            <h3 className="text-2xl font-bold text-gray-800">4.2M ₺</h3>
                        </div>
                    </div>
                </Card>
                <Card className="border-l-4 border-orange-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><ShieldAlert size={24}/></div>
                        <div>
                            <p className="text-sm text-gray-500">Güvenlik Uyarısı</p>
                            <h3 className="text-2xl font-bold text-gray-800">2</h3>
                        </div>
                    </div>
                </Card>
                <Card className="border-l-4 border-purple-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Database size={24}/></div>
                        <div>
                            <p className="text-sm text-gray-500">DB Yükü</p>
                            <h3 className="text-2xl font-bold text-gray-800">%34</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* GRAFİK VE SERVER DURUMU */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Kullanıcı Büyüme Analizi" className="lg:col-span-2">
                    <div className="mt-4 h-[300px]">
                        <SimpleChart data={userGrowthData} lineKey="Users" color="#3b82f6" />
                    </div>
                </Card>

                <Card title="Sunucu Sağlığı" headerIcon={<Server size={20}/>}>
                    <div className="space-y-6 mt-2">
                        {[
                            { label: 'CPU Kullanımı (Core 1-8)', val: 45, color: 'bg-blue-500', icon: <Cpu size={16}/> },
                            { label: 'RAM Bellek (32GB)', val: 62, color: 'bg-purple-500', icon: <Database size={16}/> },
                            { label: 'SSD Depolama', val: 25, color: 'bg-green-500', icon: <Server size={16}/> },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2 text-gray-600 items-center">
                                    <span className="flex items-center gap-2">{item.icon} {item.label}</span>
                                    <span className="font-bold">{item.val}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <button className="w-full py-2 bg-gray-50 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100">Detaylı Rapor Al</button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;