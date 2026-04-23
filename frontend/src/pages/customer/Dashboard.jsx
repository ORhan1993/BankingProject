import { useState, useEffect, useCallback } from 'react';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [wallets, setWallets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    // Verileri çekme işlemini bir fonksiyona alıyoruz ki gerektiğinde tekrar çağırabilelim
    const fetchUserData = useCallback(async () => {
        if (!userEmail) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            
            // 1. Cüzdanları ve Bakiyeleri Getir
            const walletResponse = await api.get(`/wallets?customerId=${userEmail}`);
            setWallets(walletResponse.data);

            // 2. Son İşlemleri Getir (Yatırma, Çekme, Transfer hepsi burada görünür)
            // Backend'in Pageable dönme ihtimaline karşı .data.content veya .data kontrolü yapıyoruz
            const txResponse = await api.get(`/payments/transactions?customerId=${userEmail}`);
            const txData = txResponse.data.content || txResponse.data || [];
            setTransactions(txData);
            
            setError(null);
        } catch (err) {
            console.error("Dashboard veri yükleme hatası:", err);
            setError("Veriler yüklenirken bir hata oluştu. Lütfen bağlantınızı kontrol edin.");
        } finally {
            setLoading(false);
        }
    }, [userEmail, navigate]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // İşlem durumuna göre rozet (badge) rengini belirle
    const getStatusBadge = (status) => {
        const statusMap = {
            'COMPLETED': { text: 'Tamamlandı', class: 'status-completed' },
            'SUCCESS': { text: 'Başarılı', class: 'status-completed' },
            'FAILED': { text: 'Başarısız', class: 'status-failed' },
            'PENDING': { text: 'Bekliyor', class: 'status-pending' }
        };
        const current = statusMap[status] || { text: status, class: 'status-pending' };
        return <span className={`status-badge ${current.class}`}>{current.text}</span>;
    };

    // İşlem tipine göre ikon ve renk belirle
    const getTransactionStyle = (type) => {
        switch (type) {
            case 'DEPOSIT': return { label: 'Para Yatırma', color: 'text-success', sign: '+' };
            case 'WITHDRAW': return { label: 'Para Çekme', color: 'text-danger', sign: '-' };
            case 'TRANSFER': return { label: 'Transfer', color: 'text-warning', sign: '' };
            default: return { label: type, color: '', sign: '' };
        }
    };

    return (
        <div className="page-content">
            <div className="dashboard-header">
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '5px' }}>
                        Hoşgeldin, {userEmail?.split('@')[0]} 👋
                    </h1>
                    <p style={{ color: 'var(--text-light)' }}>Hesaplarınızın güncel durumu aşağıdadır.</p>
                </div>
                <button onClick={() => navigate('/create-wallet')} className="btn btn-primary" style={{ width: 'auto' }}>
                    + Yeni Cüzdan
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <p>Veriler güncelleniyor...</p>
                </div>
            ) : error ? (
                <div className="card" style={{ textAlign: 'center', color: 'red' }}>
                    <p>{error}</p>
                    <button onClick={fetchUserData} className="btn btn-secondary" style={{ marginTop: '10px' }}>Tekrar Dene</button>
                </div>
            ) : (
                <>
                    {/* Bakiye Kartları - Dinamik */}
                    <div className="balance-grid">
                        {wallets.length > 0 ? (
                            wallets.map((wallet) => (
                                wallet.balances.map((b, index) => (
                                    <div key={`${wallet.walletId}-${index}`} className="balance-card">
                                        <div style={{ opacity: 0.8, fontSize: '14px' }}>Mevcut Bakiye ({b.currency})</div>
                                        <div className="balance-amount">
                                            {b.balance.toLocaleString()} <span style={{ fontSize: '1.5rem' }}>{b.currency}</span>
                                        </div>
                                        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '10px' }}>
                                            Cüzdan: #{wallet.walletId} | Varsayılan: {wallet.defaultCurrency}
                                        </div>
                                    </div>
                                ))
                            ))
                        ) : (
                            <div className="card" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
                                <p>Henüz aktif bir cüzdanınız bulunmuyor.</p>
                                <button onClick={() => navigate('/create-wallet')} className="btn btn-primary">Hemen Oluştur</button>
                            </div>
                        )}
                    </div>

                    {/* Hızlı İşlemler - Yeni Sayfalara Yönlendirme */}
                    <h3 style={{ marginBottom: '15px', marginTop: '30px' }}>Hızlı İşlemler</h3>
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

                    {/* İşlem Geçmişi - Dinamik Tablo */}
                    <h3 style={{ marginBottom: '15px', marginTop: '40px' }}>Son Hareketler</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>İşlem Tipi</th>
                                    <th>Açıklama</th>
                                    <th>Tutar</th>
                                    <th>Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((tx) => {
                                        const style = getTransactionStyle(tx.transactionType);
                                        return (
                                            <tr key={tx.id || tx.transactionId}>
                                                <td>
                                                    {new Date(tx.transactionDate).toLocaleDateString()} <br/>
                                                    <small style={{opacity: 0.6}}>{new Date(tx.transactionDate).toLocaleTimeString()}</small>
                                                </td>
                                                <td style={{ fontWeight: '600' }}>{style.label}</td>
                                                <td style={{ fontSize: '14px' }}>{tx.description || '-'}</td>
                                                <td className={style.color} style={{ fontWeight: 'bold' }}>
                                                    {style.sign} {tx.originalAmount || tx.amount} {tx.originalCurrency || tx.currency}
                                                </td>
                                                <td>{getStatusBadge(tx.status)}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>
                                            Henüz bir işlem kaydı bulunmuyor.
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