import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (!userEmail) return null;

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/dashboard" className="brand">
                    🏦 NeoBank
                </Link>
                
                <div className="nav-links">
                    <Link to="/dashboard" className="nav-link">Ana Sayfa</Link>
                    <Link to="/create-wallet" className="nav-link">Cüzdanlar</Link>
                    <Link to="/transfer" className="nav-link">Transfer</Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{userEmail}</span>
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-danger" 
                        style={{ padding: '8px 16px', fontSize: '14px', width: 'auto' }}
                    >
                        Çıkış
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;