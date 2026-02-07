import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Kayıt olunuyor...");

        try {
            // Backend'de /auth/register endpoint'i UserCreateRequest bekliyor
            await api.post('/auth/register', formData);
            
            setMessage("✅ Kayıt Başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            console.error("Register Error:", error);
            setMessage("❌ Kayıt Başarısız! Lütfen tekrar deneyin.");
        }
    };

    return (
        <div style={styles.container}>
            <h3>Kayıt Ol</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ad Soyad"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-posta"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Şifre"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Kayıt Ol</button>
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
    message: {
        marginTop: '15px',
        fontWeight: 'bold',
        textAlign: 'center'
    }
};

export default Register;