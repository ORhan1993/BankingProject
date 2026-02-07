import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Withdraw = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('TRY');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("İşlem yapılıyor...");

        const requestData = {
            idempotencyKey: uuidv4(),
            customerId: userEmail,
            amount: parseFloat(amount),
            currency: currency,
            description: "Web Withdraw"
        };

        try {
            await api.post('/payments/withdraw', requestData);
            setMessage("✅ Para çekme başarılı!");
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            console.error("Withdraw Error:", error);
            setMessage("❌ Hata oluştu: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h3>Para Çek</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
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

                <label>Para Birimi:</label>
                <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    style={styles.input}
                >
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <button type="submit" style={styles.button}>Çek</button>
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
        backgroundColor: '#dc3545',
        color: 'white',
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

export default Withdraw;