import React from 'react';
import Card from '../../components/common/Card';
import SimpleChart from '../../components/common/SimpleChart';
import { TrendingUp, Users, Target, AlertCircle } from 'lucide-react';

const ManagerDashboard = () => {
    // Mock Data
    const performanceData = [
        { name: 'Pzt', Hedef: 100, Gerceklesme: 120 },
        { name: 'Sal', Hedef: 100, Gerceklesme: 145 },
        { name: 'Çar', Hedef: 100, Gerceklesme: 110 },
        { name: 'Per', Hedef: 100, Gerceklesme: 135 },
        { name: 'Cum', Hedef: 120, Gerceklesme: 190 },
    ];

    return (
        <div className="space-y-6">
            {/* Şube Durum Özeti */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
                    <p className="text-blue-200 text-sm font-medium mb-1">Şube Kârlılığı</p>
                    <h3 className="text-3xl font-bold">+12.5%</h3>
                    <p className="text-xs text-blue-200 mt-2 bg-white/10 inline-block px-2 py-1 rounded">Geçen aya göre</p>
                </div>

                {[
                    { label: 'Aktif Müşteri', val: '1,450', icon: <Users size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Kredi Hedefi', val: '%85', icon: <Target size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Riskli Portföy', val: '12', icon: <AlertCircle size={20}/>, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((item, i) => (
                    <Card key={i} className="flex flex-col justify-center border-l-4 border-transparent hover:border-bank-primary transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>{item.icon}</div>
                            <div>
                                <p className="text-gray-500 text-sm">{item.label}</p>
                                <h3 className="text-2xl font-bold text-gray-800">{item.val}</h3>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Detaylı Grafik ve Liste */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Haftalık Performans (İşlem Adedi)" className="lg:col-span-2">
                    <div className="h-[300px] mt-4">
                        <SimpleChart data={performanceData} lineKey="Gerceklesme" color="#4F46E5" />
                    </div>
                </Card>

                <Card title="Personel Durumu">
                    <div className="space-y-4 mt-2">
                        {[
                            { name: 'Ahmet Y.', role: 'Gişe', status: 'Meşgul', color: 'bg-red-500' },
                            { name: 'Zeynep K.', role: 'Bireysel', status: 'Müsait', color: 'bg-green-500' },
                            { name: 'Mehmet D.', role: 'Kobi', status: 'Müsait', color: 'bg-green-500' },
                            { name: 'Elif S.', role: 'Gişe', status: 'Mola', color: 'bg-yellow-500' },
                        ].map((p, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-xl bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs text-gray-600">{p.name.charAt(0)}</div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{p.name}</p>
                                        <p className="text-xs text-gray-500">{p.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
                                    <span className="text-xs font-medium text-gray-600">{p.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ManagerDashboard;