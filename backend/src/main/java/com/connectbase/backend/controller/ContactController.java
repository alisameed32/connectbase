package com.connectbase.backend.controller;

import com.connectbase.backend.dto.ApiResponse;
import com.connectbase.backend.model.Contact;
import com.connectbase.backend.model.User;
import com.connectbase.backend.repo.UserRepo;
import com.connectbase.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private UserRepo userRepo;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Show all contacts with pagination
    @GetMapping("/contacts")
    public ResponseEntity<ApiResponse<Page<Contact>>> getContacts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        User user = getAuthenticatedUser();
        Page<Contact> contacts = contactService.getAllContacts(user, page, size);
        ApiResponse<Page<Contact>> response = new ApiResponse<>(200, "Contacts retrieved successfully", contacts);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/contact/{id}")
    public ResponseEntity<ApiResponse<Contact>> getContactById(@PathVariable long id){
        User user = getAuthenticatedUser();
        Contact contact = contactService.getContactById(id, user);
        ApiResponse<Contact> response = new ApiResponse<>(200, "Contact retrieved successfully", contact);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contact/create")
    public ResponseEntity<ApiResponse<Contact>> createContact(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("title") String title,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        User user = getAuthenticatedUser();
        Contact contact = new Contact();
        contact.setFirstName(firstName);
        contact.setLastName(lastName);
        contact.setEmail(email);
        contact.setPhone(phone);
        contact.setTitle(title);

        Contact createdContact = contactService.createContact(user, contact, image);
        return ResponseEntity.created(URI.create("/api/contact/" + createdContact.getId()))
                .body(new ApiResponse<>(201, "Contact created successfully", createdContact));
    }

    @PutMapping("/update-contact/{id}")
    public ResponseEntity<ApiResponse<Contact>> updateContact(
            @PathVariable long id,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        User user = getAuthenticatedUser();
        Contact contactDetails = new Contact();
        contactDetails.setFirstName(firstName);
        contactDetails.setLastName(lastName);
        contactDetails.setEmail(email);
        contactDetails.setPhone(phone);
        contactDetails.setTitle(title);

        Contact updatedContact = contactService.updateContact(id, user, contactDetails, image);
        return ResponseEntity.ok(new ApiResponse<>(200, "Contact updated successfully", updatedContact));
    }

    @DeleteMapping("/delete-contact/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteContact(@PathVariable long id) {
        User user = getAuthenticatedUser();
        contactService.deleteContact(id, user);
        return ResponseEntity.ok(new ApiResponse<>(200, "Contact deleted successfully", true)); 
    }

    @GetMapping("/contacts/search")
    public ResponseEntity<ApiResponse<Page<Contact>>> searchContacts(
            @RequestParam("query") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        User user = getAuthenticatedUser();
        Page<Contact> contacts = contactService.searchContacts(user, query, page, size);
        ApiResponse<Page<Contact>> response = new ApiResponse<>(200, "Search completed successfully", contacts);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/contacts/export")
    public void exportContacts(HttpServletResponse response) throws IOException {
        User user = getAuthenticatedUser();
        response.setContentType("text/csv");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"contacts.csv\"");
        contactService.exportContacts(user, response.getWriter());
    }

    @PostMapping("/contacts/import")
    public ResponseEntity<ApiResponse<String>> importContacts(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
             return ResponseEntity.badRequest().body(new ApiResponse<>(400, "File is empty", null));
        }

        if (!isCsvFile(file)) {
             return ResponseEntity.badRequest().body(new ApiResponse<>(400, "Invalid file type. Please upload a .csv file.", null));
        }

        try {
            User user = getAuthenticatedUser();
            contactService.importContacts(user, file);
            return ResponseEntity.ok(new ApiResponse<>(200, "Contacts imported successfully", null));
        } catch (IllegalArgumentException e) {
             return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        } catch (IOException e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(500, "Failed to import contacts: " + e.getMessage(), null));
        }
    }

    private boolean isCsvFile(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType != null && (contentType.equals("text/csv") || contentType.equals("application/vnd.ms-excel"))) {
            return true;
        }
        String filename = file.getOriginalFilename();
        return filename != null && filename.toLowerCase().endsWith(".csv");
    }
}
