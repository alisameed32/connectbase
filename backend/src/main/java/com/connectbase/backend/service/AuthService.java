package com.connectbase.backend.service;

import com.connectbase.backend.model.User;
import com.connectbase.backend.repo.UserRepo;
import com.connectbase.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    @Autowired private UserRepo userRepo;
    @Autowired private CloudinaryService cloudinaryService;
    @Autowired private JwtUtils jwtUtils;
    @Autowired private JavaMailSender mailSender; // Configured in application.properties

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String firstName, String lastName, String email,
                             String phone, String gender, String password, MultipartFile image) {
        if (userRepo.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhone(phone);
        user.setGender(gender);
        user.setPassword(passwordEncoder.encode(password));

        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(image);
            user.setProfilePic(imageUrl);
        }

        return userRepo.save(user);
    }

    public User loginUser(String email, String password) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

    public void generateResetCode(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String code = String.format("%06d", new Random().nextInt(999999));
        user.setVerificationCode(code);
        user.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(15));
        userRepo.save(user);

        sendEmail(email, "Password Reset Code", "Your code is: " + code);
    }

    public void resetPassword(String email, String code, String newPassword) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!code.equals(user.getVerificationCode()) ||
                user.getVerificationCodeExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Invalid or expired code");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setVerificationCode(null); // Clear code
        userRepo.save(user);
    }

    public void changePassword(String email, String oldPassword, String newPassword, String verificationCode) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Incorrect old password");
        }

        if (user.getVerificationCode() == null || !user.getVerificationCode().equals(verificationCode) ||
                user.getVerificationCodeExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Invalid or expired verification code");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setVerificationCode(null);
        userRepo.save(user);
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}