package org.bozgeyik.paymentservice.service;

import org.bozgeyik.paymentservice.dto.UserCreateRequest;
import org.bozgeyik.paymentservice.dto.UserUpdateRequest;
import org.bozgeyik.paymentservice.model.User;
import org.bozgeyik.paymentservice.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public User createUser(UserCreateRequest createRequest) {
        if (userRepository.existsByEmail(createRequest.getEmail())) {
            throw new IllegalArgumentException("Bu e-posta adresi zaten kullanılıyor: " + createRequest.getEmail());
        }

        User user = new User();
        user.setName(createRequest.getName());
        user.setEmail(createRequest.getEmail());
        user.setPassword(passwordEncoder.encode(createRequest.getPassword()));
        
        // Rol belirlenmişse onu kullan, yoksa varsayılan olarak CUSTOMER yap
        String role = (createRequest.getRole() != null && !createRequest.getRole().trim().isEmpty()) 
                      ? createRequest.getRole().toUpperCase() 
                      : "CUSTOMER";
        user.setRole(role);

        user.setCustomerId("cus_" + UUID.randomUUID().toString());

        User savedUser = userRepository.save(user);

        // Kayıt başarılı olunca otomatik "Hoş Geldin" e-postası gönderelim
        String htmlBody = String.format(
            "<div style=\"font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;\">" +
            "<h2 style=\"color: #2563eb; text-align: center;\">NeoBank'a Hoş Geldiniz!</h2>" +
            "<p style=\"color: #333; font-size: 16px;\">Sayın <strong>%s</strong>,</p>" +
            "<p style=\"color: #555; line-height: 1.5;\">Hesabınız başarıyla oluşturulmuştur. Sizi NeoBank ailesinde görmekten büyük mutluluk duyuyoruz.</p>" +
            "<div style=\"background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;\">" +
            "  <ul style=\"color: #475569; padding-left: 20px;\">" +
            "    <li><strong>Müşteri Numaranız:</strong> %s</li>" +
            "    <li><strong>Yetki Grubunuz:</strong> %s</li>" +
            "  </ul>" +
            "</div>" +
            "<p style=\"color: #555;\">Hemen giriş yaparak dijital bankacılığın ayrıcalıklarından yararlanmaya başlayabilirsiniz.</p>" +
            "<div style=\"text-align: center; margin-top: 30px;\">" +
            "  <a href=\"http://100.108.175.65:5173/login\" style=\"background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;\">Hesabıma Giriş Yap</a>" +
            "</div>" +
            "<hr style=\"border-top: 1px solid #eee; margin-top: 30px;\" />" +
            "<p style=\"font-size: 12px; color: #94a3b8; text-align: center;\">Bu e-posta otomatik olarak gönderilmiştir. Lütfen cevaplamayınız.<br/>© 2024 NeoBank A.Ş.</p>" +
            "</div>",
            savedUser.getName(), savedUser.getCustomerId(), savedUser.getRole()
        );

        emailService.sendHtmlEmail(savedUser.getEmail(), "NeoBank'a Hoş Geldiniz!", htmlBody);

        return savedUser;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Kullanıcı bulunamadı. ID: " + userId));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Kullanıcı bulunamadı: " + email));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long userId, UserUpdateRequest updateRequest) {
        User existingUser = getUserById(userId);

        if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(existingUser.getEmail())) {
            userRepository.findByEmail(updateRequest.getEmail()).ifPresent(u -> {
                if (!u.getId().equals(userId)) {
                    throw new IllegalArgumentException("Bu e-posta adresi başka bir kullanıcı tarafından kullanılıyor: " + updateRequest.getEmail());
                }
            });
            existingUser.setEmail(updateRequest.getEmail());
        }

        if (updateRequest.getName() != null) {
            existingUser.setName(updateRequest.getName());
        }

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long userId) {
        User userToDelete = getUserById(userId);
        userRepository.delete(userToDelete);
    }
}
