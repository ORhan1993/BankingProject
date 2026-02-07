import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        fetchWallets();
    }, []);

    const fetchWallets = async () => {
        try {
            // Gerçek bir endpoint olmadığı için şimdilik mock data veya user bilgisi ile simüle edebiliriz.
            // Ancak backend'de "get wallets by user" gibi bir endpoint olması lazım.
            // Şimdilik sadece bir placeholder gösterelim veya create wallet butonu koyalım.
            setLoading(false);
        } catch (error) {
            console.error("Error fetching wallets:", error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Hoşgeldin, {userEmail}</h2>
                <button onClick={handleLogout} style={styles.logoutButton}>Çıkış Yap</button>
            </div>
            
            <div style={styles.content}>
                <h3>Cüzdanlarım</h3>
                <button onClick={() => navigate('/create-wallet')} style={styles.actionButton}>+ Yeni Cüzdan Oluştur</button>
                <button onClick={() => navigate('/deposit')} style={styles.actionButton}>Para Yatır</button>
                <button onClick={() => navigate('/withdraw')} style={styles.actionButton}>Para Çek</button>
                <button onClick={() => navigate('/transfer')} style={styles.actionButton}>Transfer Yap</button>
                
                {loading ? (
                    <p>Yükleniyor...</p>
                ) : (
                    <div style={styles.walletList}>
                        <p>Henüz cüzdanınız yok veya listeleme endpoint'i hazır değil.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
        marginBottom: '20px'
    },
    logoutButton: {
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    actionButton: {
        padding: '10px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        maxWidth: '200px'
    },
    walletList: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #eee',
        borderRadius: '4px'
    }
};

export default Dashboard;