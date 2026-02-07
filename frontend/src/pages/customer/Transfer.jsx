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

        const requestData = {
            idempotencyKey: uuidv4(),
            fromCustomerId: userEmail,
            toCustomerId: toEmail,
            amount: parseFloat(amount),
            currency: currency,
            targetCurrency: targetCurrency,
            description: "Web Transfer"
        };

        try {
            await api.post('/payments/transfer', requestData);
            setMessage("✅ Transfer başarılı!");
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            console.error("Transfer Error:", error);
            setMessage("❌ Hata oluştu: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h3>Para Transferi</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Alıcı E-posta:</label>
                <input
                    type="email"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <label>Miktar:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0.01"
                    step="0.01"
                    required
                    style={styles.input}
                />

                <label>Gönderilen Para Birimi:</label>
                <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    style={styles.input}
                >
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <label>Alıcı Para Birimi:</label>
                <select 
                    value={targetCurrency} 
                    onChange={(e) => setTargetCurrency(e.target.value)}
                    style={styles.input}
                >
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <button type="submit" style={styles.button}>Transfer Et</button>
                <button type="button" onClick={() => navigate('/dashboard')} style={styles.cancelButton}>İptal</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles = {
    container: {
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#ffc107',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    cancelButton: {
        padding: '10px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    message: {
        marginTop: '15px',
        fontWeight: 'bold',
        textAlign: 'center'
    }
};

export default Transfer;