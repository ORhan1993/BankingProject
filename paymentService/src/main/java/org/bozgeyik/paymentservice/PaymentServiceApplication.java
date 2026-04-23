package org.bozgeyik.paymentservice;

import lombok.extern.slf4j.Slf4j;
import org.bozgeyik.paymentservice.model.User;
import org.bozgeyik.paymentservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

@SpringBootApplication
@EnableFeignClients
@EnableCaching
@EnableAsync
@Slf4j
public class PaymentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaymentServiceApplication.class, args);
    }

    // UYGULAMA BAŞLARKEN TEST KULLANICILARINI OLUŞTURAN VEYA GÜNCELLEYEN GARANTİLİ METOT
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            log.info("Veritabanı başlangıç kontrolü ve senkronizasyonu...");

            // Admin kullanıcısını bul veya oluştur/güncelle
            User admin = userRepository.findByEmail("admin@neobank.com.tr")
                    .orElse(new User()); // Bulamazsan yeni bir tane yarat

            admin.setName("NeoBank Yönetici");
            admin.setEmail("admin@neobank.com.tr");
            admin.setPassword(passwordEncoder.encode("123")); // Şifreyi her seferinde doğru hash ile ayarla
            admin.setRole("ADMIN");
            if (admin.getCustomerId() == null) {
                admin.setCustomerId("cus_admin_" + UUID.randomUUID().toString().substring(0, 8));
            }
            userRepository.save(admin);
            log.info("Test Admin kullanıcısı senkronize edildi.");

            // Müşteri kullanıcısını bul veya oluştur/güncelle
            User customer = userRepository.findByEmail("ornek@neobank.com.tr")
                    .orElse(new User()); // Bulamazsan yeni bir tane yarat

            customer.setName("NeoBank Müşteri");
            customer.setEmail("ornek@neobank.com.tr");
            customer.setPassword(passwordEncoder.encode("123")); // Şifreyi her seferinde doğru hash ile ayarla
            customer.setRole("CUSTOMER");
            if (customer.getCustomerId() == null) {
                customer.setCustomerId("cus_customer_" + UUID.randomUUID().toString().substring(0, 8));
            }
            userRepository.save(customer);
            log.info("Test Müşteri kullanıcısı senkronize edildi.");
        };
    }
}
