import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 animate-bounce">
                    <AlertTriangle size={48} />
                </div>

                <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Sayfa Bulunamadı</h2>
                <p className="text-gray-500 mb-8">
                    Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Lütfen adresi kontrol edin.
                </p>

                <Button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center justify-center gap-2 h-12"
                >
                    <Home size={20} /> Ana Sayfaya Dön
                </Button>
            </div>

            <div className="mt-8 text-sm text-gray-400">
                &copy; 2025 Bank Corp. Tüm hakları saklıdır.
            </div>
        </div>
    );
};

export default NotFound;