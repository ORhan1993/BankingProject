import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
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
        setMessage("Giriş yapılıyor...");

        try {
            const response = await api.post('/auth/login', formData);
            const token = response.data.token;
            
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', formData.email);
            
            setMessage("✅ Giriş Başarılı!");
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            console.error("Login Error:", error);
            setMessage("❌ Giriş Başarısız! Bilgilerinizi kontrol edin.");
        }
    };

    return (
        <div style={styles.container}>
            <h3>Giriş Yap</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
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
                <button type="submit" style={styles.button}>Giriş Yap</button>
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
        backgroundColor: '#28a745',
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

export default Login;