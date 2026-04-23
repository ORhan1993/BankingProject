import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Transfer = () => {
    const [toEmail, setToEmail] = useState('');
    const [amount, setAmount] = useState('');
    
    // Kullanıcının sahip olduğu para birimlerini dinamik olarak tutacağımız state
    const [availableCurrencies, setAvailableCurrencies] = useState(['TRY', 'USD', 'EUR']); 
    const [currency, setCurrency] = useState('TRY');
    const [targetCurrency, setTargetCurrency] = useState('TRY');
    
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    // Sayfa yüklendiğinde kullanıcının cüzdanlarını çekip dropdown'ı güncelliyoruz
    useEffect(() => {
        const fetchUserWallets = async () => {
            try {
                const response = await api.get(`/wallets?customerId=${userEmail}`);
                if (response.data && response.data.length > 0) {
                    const currencies = new Set();
                    response.data.forEach(wallet => {
                        wallet.balances.forEach(b => currencies.add(b.currency));
                    });
                    
                    if (currencies.size > 0) {
                        const currencyArray = Array.from(currencies);
                        setAvailableCurrencies(currencyArray);
                        setCurrency(currencyArray[0]); // İlk para birimini varsayılan yap
                    }
                }
            } catch (error) {
                console.error("Mevcut cüzdanlar yüklenirken hata:", error);
            }
        };

        if (userEmail) {
            fetchUserWallets();
        } else {
            navigate('/login');
        }
    }, [userEmail, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Mantıksal Hata Kontrolü: Kendine para gönderemez
        if (toEmail.toLowerCase() === userEmail.toLowerCase()) {
            setMessage("❌ Kendi hesabınıza transfer yapamazsınız.");
            return;
        }

        setMessage("⏳ Transfer işleniyor, lütfen bekleyin...");
        setIsLoading(true);

        try {
            await api.post('/payments/transfer', {
                idempotencyKey: uuidv4(),
                fromCustomerId: userEmail,
                toCustomerId: toEmail,
                amount: parseFloat(amount),
                currency: currency,
                targetCurrency: targetCurrency,
                description: "Web Transfer"
            });
            
            setMessage("✅ Transfer başarılı! Yönlendiriliyorsunuz...");
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (error) {
            setMessage("❌ Hata: " + (error.response?.data?.message || error.message));
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Para Transferi</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Alıcı E-posta</label>
                    <input
                        type="email"
                        className="form-input"
                        value={toEmail}
                        onChange={(e) => setToEmail(e.target.value)}
                        placeholder="alici@email.com"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Miktar</label>
                    <input
                        type="number"
                        className="form-input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0.01"
                        step="0.01"
                        placeholder="Örn: 150.50"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Gönderen Para Birimi</label>
                        <select 
                            className="form-input"
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)}
                            disabled={isLoading}
                        >
                            {availableCurrencies.map((cur) => (
                                <option key={`source-${cur}`} value={cur}>{cur}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Alıcı Para Birimi</label>
                        <select 
                            className="form-input"
                            value={targetCurrency} 
                            onChange={(e) => setTargetCurrency(e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="TRY">TRY</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button 
                        type="button" 
                        onClick={() => navigate('/dashboard')} 
                        className="btn btn-secondary"
                        disabled={isLoading}
                    >
                        İptal
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ backgroundColor: isLoading ? '#9ca3af' : '#f59e0b', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'İşleniyor...' : 'Transfer Et'}
                    </button>
                </div>
            </form>
            {message && (
                <p style={{ 
                    textAlign: 'center', 
                    marginTop: '15px', 
                    fontWeight: '500',
                    color: message.startsWith('❌') ? 'var(--danger-color, #ef4444)' : message.startsWith('✅') ? 'var(--success-color, #10b981)' : 'var(--text-color, #333)'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Transfer;