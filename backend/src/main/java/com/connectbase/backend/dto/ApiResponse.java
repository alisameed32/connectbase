package com.connectbase.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private String message;
    private boolean success;
    private T data;
    private LocalDateTime timestamp;

    public ApiResponse(String message, boolean success, T data) {
        this.message = message;
        this.success = success;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    // Quick constructor for Errors (no data)
    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
        this.data = null;
        this.timestamp = LocalDateTime.now();
    }
}