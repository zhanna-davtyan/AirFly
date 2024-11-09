package com.airfly.backend.user;


import com.airfly.backend.common.service.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {
        //final String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        String currentEmail = "test";
        return userRepository.findByEmail(currentEmail).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }
}
