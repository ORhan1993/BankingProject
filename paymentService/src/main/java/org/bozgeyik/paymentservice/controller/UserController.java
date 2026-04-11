package org.bozgeyik.paymentservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bozgeyik.paymentservice.dto.UserCreateRequest;
import org.bozgeyik.paymentservice.model.User;
import org.bozgeyik.paymentservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Kullanıcı yönetimi ile ilgili API endpoint'lerini içeren controller sınıfı.
 */
@RestController
@RequestMapping("/users") // Base path for all user-related endpoints
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Sistemdeki tüm kullanıcıları (Müşteri ve Personel) getirir.
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * Yeni bir kullanıcı oluşturur.
     */
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserCreateRequest createRequest) {
        User createdUser = userService.createUser(createRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    /**
     * Belirtilen ID'ye sahip kullanıcıyı getirir.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    /**
     * Belirtilen ID'ye sahip kullanıcıyı siler.
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}
