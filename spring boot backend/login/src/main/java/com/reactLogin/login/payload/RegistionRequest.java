package com.reactLogin.login.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistionRequest {


    private String username;
//    private String email;
    private String token;
    private String provider;
    private String provider_pic;
    private String provider_id;
    private String password;
}
