package com.connectbase.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                return null;
            }
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "resource_type", "auto"
            ));
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map deleteFile(String publicId) {
        try {
            if (publicId == null || publicId.isEmpty()) {
                return null;
            }
            return cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                    "resource_type", "image",
                    "invalidate", true
            ));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Helper to extract publicId from URL if needed, similar to JS split
    public String extractPublicIdFromUrl(String url) {
        if (url == null || url.isEmpty()) return null;
        try {
            // Example URL: https://res.cloudinary.com/demo/image/upload/v1570979139/sample.jpg
            // publicId: sample
            String[] parts = url.split("/");
            String lastPart = parts[parts.length - 1];
            return lastPart.split("\\.")[0];
        } catch (Exception e) {
            return null;
        }
    }
}
