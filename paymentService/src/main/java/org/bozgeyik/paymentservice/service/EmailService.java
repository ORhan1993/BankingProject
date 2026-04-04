package org.bozgeyik.paymentservice.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async; 
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.sender}")
    private String senderEmail; // application.properties'ten info@neobank.com.tr alacak

    @Async
    public void sendHtmlEmail(String to, String subject, String htmlBody) {
        log.info("E-posta gönderme işlemi başlatılıyor: {} -> {}", to, subject);
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setText(htmlBody, true); // true = HTML
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom(senderEmail); // Resmi e-posta adresi ayarlandı

            mailSender.send(mimeMessage);
            log.info("E-posta başarıyla gönderildi: {}", to);
        } catch (Exception e) {
            log.error("E-posta gönderimi başarısız: {} - Hata: {}", to, e.getMessage());
        }
    }
}
