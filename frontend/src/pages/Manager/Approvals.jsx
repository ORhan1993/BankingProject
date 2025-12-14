import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Check, X, FileText, ChevronRight, User } from 'lucide-react';

const Approvals = () => {
    const [requests, setRequests] = useState([
        { id: 1, type: 'Kredi', user: 'Ahmet Yılmaz', amount: '250.000 ₺', score: 1450, date: '10:45', desc: 'Konut tadilatı için ihtiyaç kredisi.' },
        { id: 2, type: 'EFT', user: 'XYZ Teknoloji', amount: '1.500.000 ₺', score: '-', date: '09:12', desc: 'Yurtdışı sunucu ödemesi.' },
    ]);

    const removeRequest = (id) => setRequests(requests.filter(r => r.id !== id));

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Onay Bekleyen İşlemler</h1>

            <div className="space-y-4">
                {requests.map((req) => (
                    <div key={req.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                                <div className={`p-3 rounded-xl ${req.type === 'Kredi' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{req.type} Talebi</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <User size={14}/> {req.user} • {req.date}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-800">{req.amount}</p>
                                {req.score !== '-' && (
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${req.score > 1200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                Skor: {req.score}
                            </span>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-6">
                            <span className="font-semibold">Açıklama:</span> {req.desc}
                        </div>

                        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                            <Button variant="secondary" onClick={() => removeRequest(req.id)} className="text-red-600 hover:bg-red-50 border-red-200">
                                <X size={18} className="mr-2"/> Reddet
                            </Button>
                            <Button onClick={() => removeRequest(req.id)} className="bg-green-600 hover:bg-green-700 text-white">
                                <Check size={18} className="mr-2"/> Onayla
                            </Button>
                        </div>
                    </div>
                ))}

                {requests.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-400">Bekleyen işlem bulunmamaktadır.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Approvals;