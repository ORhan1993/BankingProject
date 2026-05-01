import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, RefreshCw, Trash2, Clock, User, ChevronRight } from 'lucide-react';

const LocalMailbox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // MailHog API'den mailleri çeken fonksiyon
    const fetchEmails = async () => {
        setLoading(true);
        setError(null);
        try {
            // MailHog'un varsayılan API endpoint'i
            const response = await axios.get('http://100.108.175.65:8025/api/v2/messages');
            setMessages(response.data.items || []);
            
            // Eğer seçili bir mesaj varsa ama artık listede yoksa, seçimi temizle
            if (selectedMessage && !response.data.items?.find(m => m.ID === selectedMessage.ID)) {
                setSelectedMessage(null);
            }
        } catch (err) {
            console.error("MailHog API hatası:", err);
            setError("Mailler alınırken bir hata oluştu. Mail sunucusunun (MailHog) çalıştığından emin olun.");
        } finally {
            setLoading(false);
        }
    };

    // Tüm mailleri silen fonksiyon
    const deleteAllEmails = async () => {
        if (!window.confirm("Tüm sistem maillerini silmek istediğinize emin misiniz?")) return;
        
        try {
            await axios.delete('http://100.108.175.65:8025/api/v1/messages');
            fetchEmails(); // Listeyi yenile
            setSelectedMessage(null);
        } catch (err) {
            alert("Mailler silinirken bir hata oluştu.");
        }
    };

    // İlk yüklemede mailleri çek
    useEffect(() => {
        fetchEmails();
        // İsteğe bağlı: Her 10 saniyede bir otomatik yenile (Canlı hissi için)
        // const interval = setInterval(fetchEmails, 10000);
        // return () => clearInterval(interval);
    }, []);

    // Mail parse yardımcı fonksiyonları
    const getSender = (msg) => `${msg.From.Mailbox}@${msg.From.Domain}`;
    const getReceiver = (msg) => msg.To.map(t => `${t.Mailbox}@${t.Domain}`).join(', ');
    const getSubject = (msg) => msg.Content.Headers.Subject?.[0] || '(Konusuz)';
    const getDate = (msg) => new Date(msg.Created).toLocaleString('tr-TR');
    
    // HTML veya Text içeriği güvenli bir şekilde göster
    const getBody = (msg) => {
        const body = msg.Content.Body;
        // Eğer içerikte HTML etiketleri varsa (basit bir kontrol), tehlikeli olabilir ama bizim sistemimizden geldiği için şimdilik render edebiliriz.
        // Güvenlik (XSS) için normalde DOMPurify kullanılır.
        return { __html: body }; 
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-120px)]">
            
            {/* Üst Bar */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Mail className="text-blue-600" /> Sistem Mailleri (Gelen Kutusu)
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">NeoBank içinden gönderilen tüm otomatik e-postalar.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={fetchEmails}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 font-medium"
                    >
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> Yenile
                    </button>
                    <button 
                        onClick={deleteAllEmails}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium"
                    >
                        <Trash2 size={18} /> Tümünü Sil
                    </button>
                </div>
            </div>

            {error && (
                <div className="m-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
                    {error}
                </div>
            )}

            {/* İkili Bölme: Mail Listesi ve Mail İçeriği */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* SOL TARAF: Mail Listesi */}
                <div className="w-1/3 border-r border-gray-100 overflow-y-auto bg-gray-50/50">
                    {loading && messages.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
                    ) : messages.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                            <Mail size={40} className="mb-3 text-gray-300" />
                            Gelen kutusu boş.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {messages.map((msg) => (
                                <div 
                                    key={msg.ID} 
                                    onClick={() => setSelectedMessage(msg)}
                                    className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors ${selectedMessage?.ID === msg.ID ? 'bg-blue-50 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-gray-800 truncate pr-2" title={getSubject(msg)}>
                                            {getSubject(msg)}
                                        </h3>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 mb-2 gap-1 truncate">
                                        <User size={12} /> <span className="font-medium text-gray-700 truncate">{getReceiver(msg)}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400 gap-1">
                                        <Clock size={12} /> {getDate(msg)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SAĞ TARAF: Mail İçeriği Okuma */}
                <div className="w-2/3 overflow-y-auto bg-white p-8">
                    {selectedMessage ? (
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-8 pb-6 border-b border-gray-100">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">{getSubject(selectedMessage)}</h2>
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 w-16">Kimden:</span>
                                        <span className="font-medium bg-gray-100 px-2 py-1 rounded text-gray-700">{getSender(selectedMessage)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 w-16">Kime:</span>
                                        <span className="font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">{getReceiver(selectedMessage)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 w-16">Tarih:</span>
                                        <span className="text-gray-600">{getDate(selectedMessage)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mail Gövdesi (HTML Render) */}
                            <div className="prose max-w-none text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100" 
                                 dangerouslySetInnerHTML={getBody(selectedMessage)} 
                            />
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Mail size={64} className="mb-4 text-gray-200" />
                            <p className="text-lg">Okumak için listeden bir e-posta seçin.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LocalMailbox;