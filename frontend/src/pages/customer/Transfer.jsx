import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Send, CheckCircle, ArrowRight, User, CreditCard, ShieldCheck } from 'lucide-react';

const Transfer = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fromAccount: 'TR12...1234',
        receiverName: '',
        iban: '',
        amount: '',
        description: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleNext = (e) => {
        e.preventDefault();
        setLoading(true);
        // Yapay bir bekleme (loading efekti)
        setTimeout(() => {
            setLoading(false);
            setStep(step + 1);
        }, 600);
    };

    // İlerleme Çubuğu Bileşeni
    const ProgressBar = () => (
        <div className="flex justify-between items-center mb-8 px-4">
            {['Alıcı Bilgileri', 'Tutar & Onay', 'Sonuç'].map((label, index) => {
                const stepNum = index + 1;
                const isActive = step >= stepNum;
                const isCompleted = step > stepNum;
                return (
                    <div key={index} className="flex flex-col items-center relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                            isActive ? 'bg-bank-primary text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-500'
                        }`}>
                            {isCompleted ? <CheckCircle size={16} /> : stepNum}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${isActive ? 'text-bank-primary' : 'text-gray-400'}`}>{label}</span>
                    </div>
                )
            })}
            {/* Çizgi */}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-0">
                <div
                    className="h-full bg-bank-primary transition-all duration-500"
                    style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Para Transferi</h1>
                <p className="text-gray-500 mt-2">Güvenli ve hızlı para gönderimi</p>
            </div>

            <div className="relative">
                <ProgressBar />
            </div>

            <Card className="shadow-xl border-0 ring-1 ring-gray-100 overflow-hidden relative">

                {/* ADIM 1 */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <div className="flex items-center gap-3 mb-6 bg-blue-50 p-4 rounded-lg text-blue-800 border border-blue-100">
                            <User size={24} />
                            <div>
                                <h3 className="font-bold text-sm">Alıcı Bilgileri</h3>
                                <p className="text-xs opacity-80">Parayı göndereceğiniz kişinin bilgilerini girin.</p>
                            </div>
                        </div>

                        <form onSubmit={handleNext}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gönderen Hesap</label>
                                <div className="p-4 border rounded-xl bg-gray-50 flex justify-between items-center cursor-pointer hover:border-bank-primary transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded shadow-sm"><CreditCard size={20} className="text-gray-600"/></div>
                                        <div>
                                            <p className="font-bold text-gray-800">Vadesiz TL Hesabı</p>
                                            <p className="text-xs text-gray-500">TR12 ... 1234</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-green-600">310.500,00 ₺</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Alıcı Adı Soyadı" name="receiverName" placeholder="Örn: Ahmet Yılmaz" value={formData.receiverName} onChange={handleChange} required />
                                <Input label="IBAN" name="iban" placeholder="TR..." value={formData.iban} onChange={handleChange} required />
                            </div>

                            <div className="flex justify-end mt-8">
                                <Button type="submit" className="w-full md:w-auto flex items-center justify-center gap-2 h-12 px-8" disabled={loading}>
                                    {loading ? 'İşleniyor...' : <>Devam Et <ArrowRight size={18} /></>}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ADIM 2 */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <div className="flex items-center gap-3 mb-6 bg-orange-50 p-4 rounded-lg text-orange-800 border border-orange-100">
                            <ShieldCheck size={24} />
                            <div>
                                <h3 className="font-bold text-sm">Tutar ve Onay</h3>
                                <p className="text-xs opacity-80">Tutarı girin ve bilgileri doğrulayın.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl mb-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Alıcı</p>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">{formData.receiverName}</h3>
                            <p className="font-mono text-sm text-gray-500 bg-white inline-block px-3 py-1 rounded border">{formData.iban}</p>
                        </div>

                        <form onSubmit={handleNext}>
                            <div className="mb-6 relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gönderilecek Tutar</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full pl-4 pr-12 py-4 text-3xl font-bold text-gray-800 border-b-2 border-gray-200 focus:border-bank-primary outline-none transition-colors bg-transparent placeholder-gray-300"
                                        placeholder="0.00"
                                        autoFocus
                                        required
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">TL</span>
                                </div>
                            </div>

                            <Input label="Açıklama (İsteğe Bağlı)" name="description" placeholder="Örn: Kira" />

                            <div className="flex gap-4 mt-8">
                                <Button type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1 h-12">Geri Dön</Button>
                                <Button type="submit" className="flex-1 h-12 bg-green-600 hover:bg-green-700" disabled={loading}>
                                    {loading ? 'Onaylanıyor...' : 'Transferi Onayla'}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ADIM 3 */}
                {step === 3 && (
                    <div className="text-center py-10 animate-scale-up">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} className="text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">İşlem Başarılı!</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Para transferi işleminiz başarıyla alınmıştır. Referans No: #92831</p>

                        <div className="flex justify-center gap-4">
                            <Button onClick={() => window.location.href = '/customer/dashboard'} variant="secondary">Ana Sayfa</Button>
                            <Button onClick={() => setStep(1)}>Yeni Transfer</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Transfer;