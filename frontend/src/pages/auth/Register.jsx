import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Kayıt olunuyor...");

        try {
            await api.post('/auth/register', formData);
            setMessage("✅ Kayıt Başarılı! Yönlendiriliyorsunuz...");
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            setMessage("❌ Kayıt Başarısız! Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="form-container">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '10px' }}>Kayıt Ol</h2>
                <p style={{ color: 'var(--text-light)' }}>NeoBank ailesine katılın</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Ad Soyad</label>
                    <input
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Adınız Soyadınız"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">E-posta</label>
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
                    Hesap Oluştur
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={() => navigate('/login')} className="btn btn-secondary">
                    Giriş Yap
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

export default Register;