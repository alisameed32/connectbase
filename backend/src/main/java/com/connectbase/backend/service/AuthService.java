package com.connectbase.backend.service;

import com.connectbase.backend.model.User;
import com.connectbase.backend.repo.UserRepo;
import com.connectbase.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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

        int codeValue = new Random().nextInt(900000) + 100000;
        String code = String.valueOf(codeValue);
        
        user.setVerificationCode(code);
        user.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(15));
        userRepo.save(user);

        // Send HTML Email
        sendHtmlEmail(email, "ConnectBase: Reset Your Password", getResetPasswordEmailTemplate(user.getFirstName(), code));
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

    private void sendHtmlEmail(String to, String subject, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("ConnectBase Support <noreply@connectbase.com>");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private String getResetPasswordEmailTemplate(String firstName, String code) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<body style=\"background-color: #f3f4f6; margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\">" +
                "    <div style=\"max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);\">" +
                "        <div style=\"background-color: #4f46e5; padding: 24px; text-align: center;\">" +
                "            <h1 style=\"color: #ffffff; margin: 0; font-size: 24px;\">ConnectBase</h1>" +
                "        </div>" +
                "        <div style=\"padding: 32px; text-align: center;\">" +
                "            <h2 style=\"color: #111827; font-size: 20px; font-weight: 600; margin-bottom: 16px;\">Password Reset</h2>" +
                "            <p style=\"color: #4b5563; font-size: 16px; margin-bottom: 24px;\">" +
                "                Hi " + firstName + ", use the code below to reset your password. It expires in 15 minutes." +
                "            </p>" +
                "            <div style=\"background-color: #f3f4f6; border-radius: 8px; padding: 16px; display: inline-block; margin-bottom: 24px;\">" +
                "                <span style=\"font-size: 32px; font-weight: 700; letter-spacing: 4px; color: #4f46e5;\">" + code + "</span>" +
                "            </div>" +
                "            <p style=\"color: #6b7280; font-size: 14px;\">" +
                "                If you didn't request this, you can safely ignore this email." +
                "            </p>" +
                "        </div>" +
                "        <div style=\"background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;\">" +
                "            <p style=\"color: #9ca3af; font-size: 12px; margin: 0;\">" +
                "                © " + LocalDateTime.now().getYear() + " ConnectBase Inc." +
                "            </p>" +
                "        </div>" +
                "    </div>" +
                "</body>" +
                "</html>";
    }
}