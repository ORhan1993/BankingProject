package org.bozgeyik.paymentservice.dto;

import lombok.Data;

@Data
public class UserCreateRequest {

    private String name;
    private String email;
    private String password;
    
    // Hangi rol ile kayıt olacağını belirten alan. Örn: "CUSTOMER" veya "ADMIN"
    private String role; 
}
