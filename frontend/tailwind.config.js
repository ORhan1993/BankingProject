// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    // Tailwind'in hangi dosyalarda sınıf isimlerini arayacağını belirtiriz.
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Kurumsal kimliğe uygun birincil renk tanımlaması
            colors: {
                // Banka Mavisi (Profesyonel bir görünüm için)
                'bank-primary': '#194A8D',
                'bank-secondary': '#00B8D9',
                'bank-light': '#F5F7FA',
            },
            // Hiyerarşik paneller için gölge ayarları
            boxShadow: {
                'panel': '0 4px 12px rgba(0, 0, 0, 0.08)',
            },
        },
    },
    plugins: [],
}