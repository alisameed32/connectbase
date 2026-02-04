package com.connectbase.backend.controller;

import com.connectbase.backend.model.User;
import com.connectbase.backend.security.JwtUtils;
import com.connectbase.backend.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false) // Disable security filters for simple controller testing
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtUtils jwtUtils;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void login_ShouldReturnToken_WhenCredentialsValid() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setEmail("test@test.com");
        mockUser.setFirstName("Test");

        when(authService.loginUser(anyString(), anyString())).thenReturn(mockUser);
        when(jwtUtils.generateAccessToken(anyString())).thenReturn("mock-access-token");
        when(jwtUtils.generateRefreshToken(anyString())).thenReturn("mock-refresh-token");

        // Act & Assert
        mockMvc.perform(post("/auth/login")
                        .param("email", "test@test.com")
                        .param("password", "password123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Login successful"))
                .andExpect(jsonPath("$.data").value("Welcome Test"));
    }

    @Test
    void register_ShouldReturnUser_WhenSuccess() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("new@test.com");

        when(authService.registerUser(any(), any(), any(), any(), any(), any(), any()))
                .thenReturn(mockUser);

        // Act & Assert
        // Since the endpoint consumes Multipart/Form-data, strictly we should use multipart()
        // But for param binding verification, simple params often suffice if @RequestParam is used
        mockMvc.perform(post("/auth/register")
                        .param("firstName", "New")
                        .param("lastName", "User")
                        .param("email", "new@test.com")
                        .param("phone", "123456")
                        .param("gender", "Male")
                        .param("password", "pass"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.message").value("User registered successfully"));
    }
}