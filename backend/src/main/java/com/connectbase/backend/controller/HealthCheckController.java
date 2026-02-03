package com.connectbase.backend.controller;

import com.connectbase.backend.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthCheckController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> health() {
        String statusData = "ConnectBase Backend is up and running! 🚀";

        ApiResponse<String> response = new ApiResponse<>(200,"Health check passed", statusData);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
