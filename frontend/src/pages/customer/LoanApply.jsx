import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Calculator, CheckCircle, AlertCircle, TrendingUp, PieChart } from 'lucide-react';

const LoanApply = () => {
    const [amount, setAmount] = useState(50000);
    const [maturity, setMaturity] = useState(12);
    const [interestRate] = useState(3.49); // Örnek faiz oranı
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [step, setStep] = useState(1); // 1: Hesapla, 2: Onay, 3: Sonuç

    // Kredi Hesaplama Formülü (Basitleştirilmiş)
    useEffect(() => {
        const rate = interestRate / 100;
        const payment = (amount * rate * Math.pow(1 + rate, maturity)) / (Math.pow(1 + rate, maturity) - 1);
        setMonthlyPayment(payment);
    }, [amount, maturity, interestRate]);

    const handleApply = () => {
        setStep(2); // Onay aşamasına geç
        setTimeout(() => {
            setStep(3); // Başarılı
        }, 2000); // 2 saniye bekleme efekti
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">İhtiyaç Kredisi</h1>
                <p className="text-gray-500 mt-2">Hayallerinizi ertelemeyin, size özel faiz oranlarıyla hemen başvurun.</p>
            </div>

            {step === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* SOL: Hesaplama Aracı */}
                    <Card className="lg:col-span-2 shadow-xl border-0 ring-1 ring-gray-100">
                        <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 text-blue-800 rounded-xl">
                            <Calculator size={24} />
                            <h2 className="font-bold">Kredi Hesaplama</h2>
                        </div>

                        <div className="space-y-8">
                            {/* Tutar Slider */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="font-medium text-gray-700">Kredi Tutarı</label>
                                    <span className="text-2xl font-bold text-bank-primary">{amount.toLocaleString()} ₺</span>
                                </div>
                                <input
                                    type="range"
                                    min="5000"
                                    max="500000"
                                    step="1000"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>5.000 ₺</span>
                                    <span>500.000 ₺</span>
                                </div>
                            </div>

                            {/* Vade Seçimi */}
                            <div>
                                <label className="font-medium text-gray-700 block mb-4">Vade (Ay)</label>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    {[12, 24, 36, 48].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setMaturity(m)}
                                            className={`py-2 px-4 rounded-lg font-bold transition-all ${
                                                maturity === m
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {m} Ay
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* SAĞ: Ödeme Planı Özeti */}
                    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-30 -mr-16 -mt-16"></div>

                        <div className="relative z-10 space-y-6">
                            <div>
                                <p className="text-gray-400 text-sm">Aylık Taksit Tutarı</p>
                                <h3 className="text-4xl font-bold tracking-tight text-green-400">
                                    {monthlyPayment.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                                </h3>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-700">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Faiz Oranı</span>
                                    <span className="font-bold">%{interestRate}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Toplam Geri Ödeme</span>
                                    <span className="font-bold">{(monthlyPayment * maturity).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Tahsis Ücreti</span>
                                    <span className="font-bold">0,00 ₺</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleApply}
                            className="mt-8 w-full py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors relative z-10 flex items-center justify-center gap-2"
                        >
                            Hemen Başvur <TrendingUp size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Yükleniyor / Onay Ekranı */}
            {step === 2 && (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <PieChart size={64} className="text-blue-500 mb-6 animate-spin-slow" />
                    <h2 className="text-2xl font-bold text-gray-800">Başvurunuz Değerlendiriliyor...</h2>
                    <p className="text-gray-500">Kredi skorunuz ve limitleriniz kontrol ediliyor.</p>
                </div>
            )}

            {/* Başarılı Sonuç */}
            {step === 3 && (
                <Card className="max-w-2xl mx-auto text-center py-12 border-t-4 border-green-500 animate-scale-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Başvurunuz Alındı!</h2>
                    <p className="text-gray-600 mb-8 px-8">
                        <span className="font-bold">{amount.toLocaleString()} ₺</span> tutarındaki kredi başvurunuz ön onayı geçmiştir.
                        Şube müdürümüzün son onayından sonra tutar hesabınıza yatırılacaktır.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-xl inline-block text-left mb-8">
                        <p className="text-sm text-gray-500">Başvuru Referans No:</p>
                        <p className="font-mono font-bold text-gray-800">KRD-2025-88219</p>
                    </div>
                    <div>
                        <Button onClick={() => window.location.href = '/customer/dashboard'}>Ana Sayfaya Dön</Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default LoanApply;