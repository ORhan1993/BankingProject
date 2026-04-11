package org.bozgeyik.paymentservice.config;

import org.bozgeyik.paymentservice.model.User;
import org.bozgeyik.paymentservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("Veritabanı başlangıç kontrolü yapılıyor...");

        // Admin kullanıcısı var mı diye kontrol et
        if (!userRepository.existsByEmail("admin@neobank.com.tr")) {
            log.info("Test Admin kullanıcısı bulunamadı, oluşturuluyor...");
            User admin = new User();
            admin.setName("NeoBank Yönetici");
            admin.setEmail("admin@neobank.com.tr");
            admin.setPassword(passwordEncoder.encode("123"));
            admin.setRole("ADMIN");
            admin.setCustomerId("cus_admin_" + UUID.randomUUID().toString().substring(0, 8));
            userRepository.save(admin);
            log.info("Test Admin kullanıcısı başarıyla oluşturuldu.");
        } else {
            log.info("Test Admin kullanıcısı zaten mevcut.");
        }

        // Müşteri kullanıcısı var mı diye kontrol et
        if (!userRepository.existsByEmail("ornek@neobank.com.tr")) {
            log.info("Test Müşteri kullanıcısı bulunamadı, oluşturuluyor...");
            User customer = new User();
            customer.setName("NeoBank Müşteri");
            customer.setEmail("ornek@neobank.com.tr");
            customer.setPassword(passwordEncoder.encode("123"));
            customer.setRole("CUSTOMER");
            customer.setCustomerId("cus_customer_" + UUID.randomUUID().toString().substring(0, 8));
            userRepository.save(customer);
            log.info("Test Müşteri kullanıcısı başarıyla oluşturuldu.");
        } else {
            log.info("Test Müşteri kullanıcısı zaten mevcut.");
        }
    }
}
