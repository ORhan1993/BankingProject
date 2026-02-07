import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CreateWallet = () => {
    const [currency, setCurrency] = useState('TRY');
    const [initialBalance, setInitialBalance] = useState(0);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("İşleniyor...");

        try {
            await api.post('/wallets', {
                email: userEmail,
                defaultCurrency: currency,
                initialBalance: initialBalance
            });
            setMessage("✅ Cüzdan başarıyla oluşturuldu!");
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (error) {
            setMessage("❌ Hata oluştu: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="form-container">
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Yeni Cüzdan Oluştur</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Para Birimi</label>
                    <select 
                        className="form-input"
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="TRY">TRY - Türk Lirası</option>
                        <option value="USD">USD - Amerikan Doları</option>
                        <option value="EUR">EUR - Euro</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Başlangıç Bakiyesi</label>
                    <input
                        type="number"
                        className="form-input"
                        value={initialBalance}
                        onChange={(e) => setInitialBalance(e.target.value)}
                        min="0"
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
                        İptal
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Oluştur
                    </button>
                </div>
            </form>
            {message && <p style={{ textAlign: 'center', marginTop: '15px', fontWeight: '500' }}>{message}</p>}
        </div>
    );
};

export default CreateWallet;