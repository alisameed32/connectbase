package com.connectbase.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users") // 'user' is often a reserved keyword in SQL
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // Encrypted
    private String firstName;
    private String lastName;
    private String phone;
    private String gender;
    private String profilePic; // Cloudinary URL

    // For Password Reset Simplicity
    private String verificationCode;
    private LocalDateTime verificationCodeExpiry;
}