package com.connectbase.backend.controller;

import com.connectbase.backend.dto.ApiResponse;
import com.connectbase.backend.model.User;
import com.connectbase.backend.security.JwtUtils;
import com.connectbase.backend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Vital for Cookies
public class AuthController {

    @Autowired private AuthService authService;
    @Autowired private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("gender") String gender,
            @RequestParam("password") String password,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        User user = authService.registerUser(firstName, lastName, email, phone, gender, password, image);
        return ResponseEntity.ok(new ApiResponse<>(201, "User registered successfully", user));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            HttpServletResponse response) {

        User user = authService.loginUser(email, password);

        // Generate Tokens
        String accessToken = jwtUtils.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

        // Set Cookies
        addCookie(response, "accessToken", accessToken, 15 * 60);
        addCookie(response, "refreshToken", refreshToken, 7 * 24 * 60 * 60);

        return ResponseEntity.ok(new ApiResponse<>(200, "Login successful", "Welcome " + user.getFirstName()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestParam("email") String email) {
        authService.generateResetCode(email);
        return ResponseEntity.ok(new ApiResponse<>(200, "Verification code sent to email", null));
    }

    @PostMapping("/send-verification-code")
    public ResponseEntity<ApiResponse<String>> sendVerificationCode(java.security.Principal principal) {
        authService.generateResetCode(principal.getName());
        return ResponseEntity.ok(new ApiResponse<>(200, "Verification code sent to email", null));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @RequestParam("email") String email,
            @RequestParam("code") String code,
            @RequestParam("newPassword") String newPassword) {

        authService.resetPassword(email, code, newPassword);
        return ResponseEntity.ok(new ApiResponse<>(200, "Password reset successfully", null));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            @RequestBody com.connectbase.backend.dto.ChangePasswordRequest request,
            java.security.Principal principal) {
        
        authService.changePassword(
            principal.getName(), 
            request.getOldPassword(), 
            request.getNewPassword(), 
            request.getVerificationCode()
        );
        return ResponseEntity.ok(new ApiResponse<>(200, "Password changed successfully", null));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletResponse response) {
        // Overwrite cookies with age 0
        addCookie(response, "accessToken", "", 0);
        addCookie(response, "refreshToken", "", 0);
        return ResponseEntity.ok(new ApiResponse<>(200, "Logged out", null));
    }

    private void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true); // Secure: JS cannot read this
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }
}