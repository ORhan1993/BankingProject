import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Transfer = () => {
    const [toEmail, setToEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('TRY');
    const [targetCurrency, setTargetCurrency] = useState('TRY');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Transfer yapılıyor...");

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
            setMessage("✅ Transfer başarılı!");
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (error) {
            setMessage("❌ Hata: " + (error.response?.data?.message || error.message));
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
                        required
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
                        required
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Gönderen Para Birimi</label>
                        <select 
                            className="form-input"
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="TRY">TRY</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Alıcı Para Birimi</label>
                        <select 
                            className="form-input"
                            value={targetCurrency} 
                            onChange={(e) => setTargetCurrency(e.target.value)}
                        >
                            <option value="TRY">TRY</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
                        İptal
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#f59e0b', border: 'none' }}>
                        Transfer Et
                    </button>
                </div>
            </form>
            {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
        </div>
    );
};

export default Transfer;