package com.reactLogin.login.controller;

import com.reactLogin.login.model.User;
import com.reactLogin.login.payload.JWTLoginSucessReponse;
import com.reactLogin.login.payload.LoginRequest;
import com.reactLogin.login.payload.RegistionRequest;
import com.reactLogin.login.payload.SocialLoginRequest;
import com.reactLogin.login.repository.UserRepository;
import com.reactLogin.login.security.JwtTokenProvider;
import com.reactLogin.login.service.MapValidationErrorService;
import com.reactLogin.login.service.UserService;
import com.reactLogin.login.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static com.reactLogin.login.security.SecurityConstants.TOKEN_PREFIX;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/signup")
    public User registerUser(@RequestBody User user){
         return userRepository.save(user);

    }
//
//    @PostMapping("/register1")
//    public User signIn(@RequestBody User user){
//        User user1 =userRepository.findByName(user.getUsername());
//        if(user1 != null){
//            return user1;
//        }else{
//            return null;
//        }
//
//    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/registerSocial")
    public ResponseEntity<?> registerUserOnSocial(@RequestBody RegistionRequest registionRequest, BindingResult result){
        // Validate passwords match

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User user1= User.builder().username(registionRequest.getUsername()).token(registionRequest.getToken()).build();

        User newUser = userService.saveUser0nSocial(user1);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }
    @PostMapping("/loginSocial")
    public ResponseEntity<?> authenticateUserSociak(@Valid @RequestBody SocialLoginRequest socialLoginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        User user1 = userRepository.findByUsername(socialLoginRequest.getUsername());

        String jwt = TOKEN_PREFIX +  tokenProvider.generateTokenSocial(user1);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @GetMapping("/getAllUser")
    @PreAuthorize("hasRole('Admin')")
    public Iterable<User> allUsers(){
        return userRepository.findAll();
    }


}
