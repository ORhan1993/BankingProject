package org.bozgeyik.paymentservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Kime gönderildiği (E-posta, Telefon No vb.)
    @Column(name = "recipient", nullable = false)
    private String recipient;

    // Bildirim türü (EMAIL, SMS, PUSH)
    @Column(name = "type", nullable = false)
    private String type;

    // Konu (Subject)
    @Column(name = "subject", nullable = false)
    private String subject;

    // İçerik (Loglanacağı için çok uzun olabilir)
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    // Durum (PENDING, SENT, FAILED)
    @Column(name = "status", nullable = false)
    private String status;

    // Hata mesajı (Eğer gönderim başarısız olursa)
    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Gönderim zamanı
    @Column(name = "sent_at")
    private LocalDateTime sentAt;
}
