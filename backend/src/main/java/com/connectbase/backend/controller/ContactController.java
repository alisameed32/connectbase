package com.connectbase.backend.controller;

import com.connectbase.backend.dto.ApiResponse;
import com.connectbase.backend.model.Contact;
import com.connectbase.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;


import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // Show all contacts with pagination
    @GetMapping("/contacts")
    public ResponseEntity<ApiResponse<Page<Contact>>> getContacts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Contact> contacts = contactService.getAllContacts(page, size);
        ApiResponse<Page<Contact>> response = new ApiResponse<>(200, "Contacts retrieved successfully", contacts);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/contact/{id}")
    public ResponseEntity<ApiResponse<Contact>> getContactById(@PathVariable long id){
        Contact contact = contactService.getContactById(id);
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
        
        Contact contact = new Contact();
        contact.setFirstName(firstName);
        contact.setLastName(lastName);
        contact.setEmail(email);
        contact.setPhone(phone);
        contact.setTitle(title);

        Contact createdContact = contactService.createContact(contact, image);
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

        Contact contactDetails = new Contact();
        contactDetails.setFirstName(firstName);
        contactDetails.setLastName(lastName);
        contactDetails.setEmail(email);
        contactDetails.setPhone(phone);
        contactDetails.setTitle(title);

        Contact updatedContact = contactService.updateContact(id, contactDetails, image);
        return ResponseEntity.ok(new ApiResponse<>(200, "Contact updated successfully", updatedContact));
    }

    @DeleteMapping("/delete-contact/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteContact(@PathVariable long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Contact deleted successfully", true)); 
    }

    @GetMapping("/contacts/search")
    public ResponseEntity<ApiResponse<Page<Contact>>> searchContacts(
            @RequestParam("query") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Contact> contacts = contactService.searchContacts(query, page, size);
        ApiResponse<Page<Contact>> response = new ApiResponse<>(200, "Search completed successfully", contacts);
        return ResponseEntity.ok(response);
    }

}
