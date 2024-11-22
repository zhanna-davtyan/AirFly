package com.airfly.backend.user;

import com.airfly.backend.config.UserAuthenticationProvider;
import com.airfly.backend.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final EmailService emailService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    private final String htmlContent ="<pre><span>Hello, <br>welcome to <strong>AirFly</strong>. <br>You are now registered and can start booking your flights. <br>Your AirFly team</span></pre>";
    private final String subject = "Welcome to AirFly";

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getEmail()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser.getEmail()));
        emailService.sendEmail(createdUser.getEmail(), subject, htmlContent);
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
}
