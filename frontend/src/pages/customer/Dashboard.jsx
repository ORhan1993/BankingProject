import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [wallets, setWallets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        if (userEmail) {
            fetchUserData();
        } else {
            navigate('/login');
        }
    }, [userEmail]);

    const fetchUserData = async () => {
        try {
            const walletResponse = await api.get(`/wallets?customerId=${userEmail}`);
            setWallets(walletResponse.data);

            const txResponse = await api.get(`/payments/transactions?customerId=${userEmail}`);
            setTransactions(txResponse.data.content || []);
        } catch (error) {
            console.error("Veri hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'COMPLETED': return <span className="status-badge status-completed">Tamamlandı</span>;
            case 'FAILED': return <span className="status-badge status-failed">Başarısız</span>;
            default: return <span className="status-badge status-pending">Bekliyor</span>;
        }
    };

    return (
        <div className="page-content">
            <div className="dashboard-header">
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '5px' }}>
                        Hoşgeldin, {userEmail?.split('@')[0]} 👋
                    </h1>
                    <p style={{ color: 'var(--text-light)' }}>Finansal durumunuzun özeti burada.</p>
                </div>
                <button onClick={() => navigate('/create-wallet')} className="btn btn-primary" style={{ width: 'auto' }}>
                    + Yeni Cüzdan
                </button>
            </div>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <>
                    {/* Bakiye Kartları */}
                    <div className="balance-grid">
                        {wallets.length > 0 ? (
                            wallets.map((wallet) => (
                                wallet.balances.map((b, index) => (
                                    <div key={`${wallet.walletId}-${index}`} className="balance-card">
                                        <div style={{ opacity: 0.8, fontSize: '14px' }}>Toplam Bakiye</div>
                                        <div className="balance-amount">
                                            {b.balance} <span style={{ fontSize: '1.5rem' }}>{b.currency}</span>
                                        </div>
                                        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '10px' }}>
                                            Cüzdan ID: #{wallet.walletId}
                                        </div>
                                    </div>
                                ))
                            ))
                        ) : (
                            <div className="card" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
                                <p>Henüz cüzdanınız yok.</p>
                            </div>
                        )}
                    </div>

                    {/* Hızlı İşlemler */}
                    <h3 style={{ marginBottom: '15px' }}>Hızlı İşlemler</h3>
                    <div className="action-grid">
                        <div className="action-card" onClick={() => navigate('/deposit')}>
                            <div style={{ fontSize: '24px', marginBottom: '10px' }}>💰</div>
                            Para Yatır
                        </div>
                        <div className="action-card" onClick={() => navigate('/withdraw')}>
                            <div style={{ fontSize: '24px', marginBottom: '10px' }}>💸</div>
                            Para Çek
                        </div>
                        <div className="action-card" onClick={() => navigate('/transfer')}>
                            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔄</div>
                            Transfer Yap
                        </div>
                    </div>

                    {/* İşlem Geçmişi */}
                    <h3 style={{ marginBottom: '15px', marginTop: '40px' }}>Son İşlemler</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>İşlem Tipi</th>
                                    <th>Tutar</th>
                                    <th>Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((tx) => (
                                        <tr key={tx.id}>
                                            <td>{new Date(tx.transactionDate).toLocaleDateString()} {new Date(tx.transactionDate).toLocaleTimeString()}</td>
                                            <td style={{ fontWeight: '500' }}>{tx.transactionType}</td>
                                            <td className={tx.transactionType === 'DEPOSIT' ? 'text-success' : 'text-danger'}>
                                                {tx.transactionType === 'DEPOSIT' ? '+' : '-'} {tx.originalAmount} {tx.originalCurrency}
                                            </td>
                                            <td>{getStatusBadge(tx.status)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>
                                            Henüz işlem kaydı bulunmuyor.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;