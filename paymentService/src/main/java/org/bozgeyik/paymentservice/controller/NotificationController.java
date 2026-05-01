package org.bozgeyik.paymentservice.controller;

import lombok.RequiredArgsConstructor;
import org.bozgeyik.paymentservice.model.Notification;
import org.bozgeyik.paymentservice.repository.NotificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Operasyon Merkezi ve Müşteri Hizmetleri için Bildirim (E-posta/SMS) Loglarını Sunan API
 */
@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;

    /**
     * Sistemdeki tüm gönderilen veya gönderilemeyen iletişimleri listeler.
     * Güvenlik Notu: Bu endpoint sadece ADMIN veya MANAGER rollerine açık olmalıdır. (SecurityConfig'den yönetilir)
     */
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationRepository.findAllByOrderByCreatedAtDesc());
    }
}
