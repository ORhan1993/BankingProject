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
        setMessage("Cüzdan oluşturuluyor...");

        const requestData = {
            email: userEmail,
            defaultCurrency: currency,
            initialBalance: initialBalance
        };

        try {
            await api.post('/wallets', requestData);
            setMessage("✅ Cüzdan başarıyla oluşturuldu!");
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            console.error("Create Wallet Error:", error);
            setMessage("❌ Hata oluştu: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h3>Yeni Cüzdan Oluştur</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
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

                <label>Başlangıç Bakiyesi:</label>
                <input
                    type="number"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    min="0"
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Oluştur</button>
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
        backgroundColor: '#007bff',
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

export default CreateWallet;