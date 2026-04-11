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

    // UYGULAMA BAŞLARKEN TEST KULLANICILARINI OLUŞTURAN GARANTİLİ METOT
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            log.info("Veritabanı başlangıç kontrolü (Ana Uygulama Sınıfı)...");

            // Admin kullanıcısı
            if (!userRepository.existsByEmail("admin@neobank.com.tr")) {
                log.info("Test Admin kullanıcısı oluşturuluyor...");
                User admin = new User();
                admin.setName("NeoBank Yönetici");
                admin.setEmail("admin@neobank.com.tr");
                admin.setPassword(passwordEncoder.encode("123"));
                admin.setRole("ADMIN");
                admin.setCustomerId("cus_admin_" + UUID.randomUUID().toString().substring(0, 8));
                userRepository.save(admin);
                log.info("Test Admin kullanıcısı başarıyla oluşturuldu.");
            }

            // Müşteri kullanıcısı
            if (!userRepository.existsByEmail("ornek@neobank.com.tr")) {
                log.info("Test Müşteri kullanıcısı oluşturuluyor...");
                User customer = new User();
                customer.setName("NeoBank Müşteri");
                customer.setEmail("ornek@neobank.com.tr");
                customer.setPassword(passwordEncoder.encode("123"));
                customer.setRole("CUSTOMER");
                customer.setCustomerId("cus_customer_" + UUID.randomUUID().toString().substring(0, 8));
                userRepository.save(customer);
                log.info("Test Müşteri kullanıcısı başarıyla oluşturuldu.");
            }
        };
    }
}
