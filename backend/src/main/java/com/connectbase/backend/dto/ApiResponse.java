package com.connectbase.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private int status;
    private String message;
    private boolean success;
    private T data;
    private LocalDateTime timestamp;

    public ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.success = true;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    public ApiResponse(int status, String message, boolean success, T data) {
        this.status = status;
        this.message = message;
        this.success = success;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    // Quick constructor for Errors (no data)
    public ApiResponse(int status, String message, boolean success) {
        this.status = status;
        this.message = message;
        this.success = success;
        this.data = null;
        this.timestamp = LocalDateTime.now();
    }
}