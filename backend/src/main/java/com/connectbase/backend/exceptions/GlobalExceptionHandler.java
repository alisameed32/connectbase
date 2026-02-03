package com.connectbase.backend.exceptions;

import com.connectbase.backend.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 1. Handle Generic Exceptions (Catch-All)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGlobalException(Exception ex) {
        log.error("❌ Unexpected Error: ", ex); // Logs the full stack trace for YOU
        return new ResponseEntity<>(
                new ApiResponse<>("An internal error occurred. Please contact support.", false),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    // 2. Handle Custom "Resource Not Found" (Example)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<String>> handleRuntimeException(RuntimeException ex) {
        log.warn("⚠️ Application Warning: {}", ex.getMessage());
        return new ResponseEntity<>(
                new ApiResponse<>(ex.getMessage(), false),
                HttpStatus.BAD_REQUEST
        );
    }
}
