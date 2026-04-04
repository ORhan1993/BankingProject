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

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

        return userRepository.save(user);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Kullanıcı bulunamadı. ID: " + userId));
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
