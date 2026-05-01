package org.bozgeyik.paymentservice.service;

import lombok.RequiredArgsConstructor;
import org.bozgeyik.paymentservice.dto.AuthRequest;
import org.bozgeyik.paymentservice.dto.AuthResponse;
import org.bozgeyik.paymentservice.dto.UserCreateRequest;
import org.bozgeyik.paymentservice.model.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Kayıt ol ve hemen Token üret
    public AuthResponse register(UserCreateRequest request) {
        User user = userService.createUser(request);

        // JWT içine rol bilgisini de ekliyoruz
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole());

        String token = jwtService.generateToken(extraClaims, user.getEmail());
        return new AuthResponse(token);
    }

    // Giriş yap ve Token üret
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Şifre doğrulandıktan sonra veritabanından kullanıcının rolünü al
        // AuthenticationManager sadece email/şifre doğrular, rol bilgisini JWT'ye basmak için UserService'den okuyoruz
        User user = userService.getUserByEmail(request.getEmail());

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole());

        // Rolü de JWT'nin içine gömerek token üret
        String token = jwtService.generateToken(extraClaims, user.getEmail());
        return new AuthResponse(token);
    }
}
