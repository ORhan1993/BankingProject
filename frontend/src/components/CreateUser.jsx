import { useState } from 'react';
import api from '../api/axiosConfig';

const CreateUser = () => {
    // Form verilerini tutan state
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: ''
    });

    // Sunucudan gelen cevabı tutan state
    const [message, setMessage] = useState(null);

    // Input değişince state'i güncelle
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form gönderilince çalışacak fonksiyon
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Kaydediliyor...");

        try {
            // Backend'e POST isteği atıyoruz: /api/payment/customer/create
            const response = await api.post('/customer/create', formData);

            // Başarılı olursa
            setMessage("✅ " + response.data.message);
            console.log("Sunucu Cevabı:", response.data);

            // Formu temizle
            setFormData({ name: '', surname: '', email: '' });
        } catch (error) {
            // Hata olursa
            console.error("Hata:", error);
            setMessage("❌ Bağlantı Hatası! Backend çalışıyor mu?");
        }
    };

    return (
        <div style={styles.container}>
            <h3>Yeni Müşteri Kaydı</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ad"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Soyad"
                    value={formData.surname}
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
                <button type="submit" style={styles.button}>Kaydet</button>
            </form>

            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

// Basit CSS stilleri (Hızlı görünüm için)
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

export default CreateUser;