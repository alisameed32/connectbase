package com.connectbase.backend.service;

import com.connectbase.backend.model.Contact;
import com.connectbase.backend.model.User;
import com.connectbase.backend.repo.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private CloudinaryService cloudinaryService;

    public Page<Contact> getAllContacts(User user, int page, int size) {
        return contactRepo.findByUser(user, PageRequest.of(page, size));
    }

    public Page<Contact> searchContacts(User user, String keyword, int page, int size) {
        return contactRepo.searchContacts(user, keyword, PageRequest.of(page, size));
    }

    public Contact getContactById(long id, User user){
        Contact contact = contactRepo.findById(id).orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        if (contact.getUser().getId() != user.getId()) {
            throw new RuntimeException("Unauthorized access to contact");
        }
        return contact;
    }

    public Contact createContact(User user, Contact contact, MultipartFile imageFile) {
        contact.setUser(user);
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(imageFile);
            contact.setImage(imageUrl);
        }
        return contactRepo.save(contact);
    }

    public Contact updateContact(long id, User user, Contact updatedContactDetails, MultipartFile imageFile) {
        Contact existingContact = getContactById(id, user);

        if (updatedContactDetails.getFirstName() != null) existingContact.setFirstName(updatedContactDetails.getFirstName());
        if (updatedContactDetails.getLastName() != null) existingContact.setLastName(updatedContactDetails.getLastName());
        if (updatedContactDetails.getEmail() != null) existingContact.setEmail(updatedContactDetails.getEmail());
        if (updatedContactDetails.getPhone() != null) existingContact.setPhone(updatedContactDetails.getPhone());
        if (updatedContactDetails.getTitle() != null) existingContact.setTitle(updatedContactDetails.getTitle());

        if (imageFile != null && !imageFile.isEmpty()) {
            // Delete old image if exists
            if (existingContact.getImage() != null) {
                String publicId = cloudinaryService.extractPublicIdFromUrl(existingContact.getImage());
                if (publicId != null) {
                    cloudinaryService.deleteFile(publicId);
                }
            }
            // Upload new image
            String imageUrl = cloudinaryService.uploadFile(imageFile);
            existingContact.setImage(imageUrl);
        }
        
        return contactRepo.save(existingContact);
    }

    public void deleteContact(long id, User user) {
        Contact existingContact = getContactById(id, user);
        // Delete image from Cloudinary if exists
        if (existingContact.getImage() != null) {
            String publicId = cloudinaryService.extractPublicIdFromUrl(existingContact.getImage());
            if (publicId != null) {
                cloudinaryService.deleteFile(publicId);
            }
        }
        contactRepo.delete(existingContact);
    }

   
}
