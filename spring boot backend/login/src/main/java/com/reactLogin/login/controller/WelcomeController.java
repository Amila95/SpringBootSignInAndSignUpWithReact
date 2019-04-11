package com.reactLogin.login.controller;

import com.reactLogin.login.model.User;
import com.reactLogin.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/welcome")
public class WelcomeController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/getAllUser")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Iterable<User> allUsers(){
        return userRepository.findAll();
    }
}
