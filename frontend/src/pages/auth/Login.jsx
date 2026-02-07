import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Giriş yapılıyor...");

        try {
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', formData.email);
            navigate('/dashboard');
        } catch (error) {
            setMessage("❌ Giriş Başarısız! Bilgilerinizi kontrol edin.");
        }
    };

    return (
        <div className="form-container">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '10px' }}>NeoBank</h2>
                <p style={{ color: 'var(--text-light)' }}>Hesabınıza giriş yapın</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">E-posta Adresi</label>
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Şifre</label>
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                    Giriş Yap
                </button>
            </form>

            <div style={{ marginTop: '25px', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '15px' }}>
                    Henüz bir hesabınız yok mu?
                </p>
                <button 
                    onClick={() => navigate('/register')} 
                    className="btn btn-secondary"
                    style={{ fontWeight: '600' }}
                >
                    Kayıt Ol
                </button>
            </div>

            {message && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '10px', 
                    borderRadius: '8px', 
                    backgroundColor: message.includes('❌') ? '#fee2e2' : '#d1fae5',
                    color: message.includes('❌') ? '#991b1b' : '#065f46',
                    textAlign: 'center',
                    fontSize: '14px'
                }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default Login;