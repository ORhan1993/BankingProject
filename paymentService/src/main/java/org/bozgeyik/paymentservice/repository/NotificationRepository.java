package org.bozgeyik.paymentservice.repository;

import org.bozgeyik.paymentservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Belirli bir e-posta adresine atılan bildirimleri getirmek için (Müşteri hizmetleri araması)
    List<Notification> findByRecipientOrderByCreatedAtDesc(String recipient);

    // Sadece durumu FAILED olanları getirmek için (Retry mekanizması için kullanılabilir)
    List<Notification> findByStatusOrderByCreatedAtDesc(String status);
    
    // Son gönderilenleri listelemek için genel sorgu (Yönetici Paneli)
    List<Notification> findAllByOrderByCreatedAtDesc();
}
