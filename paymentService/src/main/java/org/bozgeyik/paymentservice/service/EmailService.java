package org.bozgeyik.paymentservice.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bozgeyik.paymentservice.model.Notification;
import org.bozgeyik.paymentservice.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final NotificationRepository notificationRepository; // Veritabanı kayıt işlemleri için

    @Value("${app.mail.sender}")
    private String senderEmail;

    // Asenkron gönderim fonksiyonu
    @Async
    public void sendHtmlEmail(String to, String subject, String htmlBody) {
        
        // 1. ADIM: E-posta gönderilmeden önce (Daha gönderim başlamadı), DB'ye PENDING (Bekliyor) olarak kaydet
        Notification notificationLog = Notification.builder()
                .recipient(to)
                .type("EMAIL")
                .subject(subject)
                .content(htmlBody)
                .status("PENDING")
                .build();
        
        // Önce kaydedip ID alıyoruz (Transaction güvenliği için önemli)
        notificationLog = notificationRepository.save(notificationLog);

        log.info("E-posta kuyruğa alındı (DB ID: {}): {} -> {}", notificationLog.getId(), to, subject);

        // 2. ADIM: Gerçek Gönderim İşlemi
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setText(htmlBody, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom(senderEmail);

            // Gerçek SMTP veya MailHog sunucusuna gönderme emri (Burada tıkanabilir/hata verebilir)
            mailSender.send(mimeMessage);
            
            // 3. ADIM (BAŞARILI): Gönderim başarılı olursa DB logunu SENT (Gönderildi) olarak güncelle
            notificationLog.setStatus("SENT");
            notificationLog.setSentAt(LocalDateTime.now());
            notificationRepository.save(notificationLog);
            
            log.info("E-posta başarıyla iletildi (DB ID: {}): {}", notificationLog.getId(), to);

        } catch (Exception e) {
            // 4. ADIM (HATALI): Sunucu çökük, port kapalı, mail yanlış vs. ise logu FAILED (Hata) olarak güncelle
            log.error("E-posta iletimi başarısız (DB ID: {}): {} - Hata: {}", notificationLog.getId(), to, e.getMessage());
            
            notificationLog.setStatus("FAILED");
            // Hatanın sadece 1000 karakterlik kısmını kaydedelim ki DB patlamasın (Stacktrace uzun olabilir)
            String errorMsg = e.getMessage() != null && e.getMessage().length() > 1000 
                                ? e.getMessage().substring(0, 1000) 
                                : e.getMessage();
            notificationLog.setErrorMessage(errorMsg);
            notificationRepository.save(notificationLog);
        }
    }
}
