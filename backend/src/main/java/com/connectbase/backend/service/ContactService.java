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
import java.io.*;
import java.util.ArrayList;
import java.util.List;

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

    public void exportContacts(User user, PrintWriter writer) {
        List<Contact> contacts = contactRepo.findByUser(user);
        writer.write("First Name,Last Name,Email,Phone,Title,Image URL\n");
        for (Contact contact : contacts) {
            writer.write(escapeSpecialCharacters(contact.getFirstName()) + "," +
                    escapeSpecialCharacters(contact.getLastName()) + "," +
                    escapeSpecialCharacters(contact.getEmail()) + "," +
                    escapeSpecialCharacters(contact.getPhone()) + "," +
                    escapeSpecialCharacters(contact.getTitle()) + "," +
                    escapeSpecialCharacters(contact.getImage()) + "\n");
        }
    }

    private String escapeSpecialCharacters(String data) {
        if (data == null) {
            return "";
        }
        String escapedData = data.replaceAll("\\R", " ");
        if (escapedData.contains(",") || escapedData.contains("\"") || escapedData.contains("'")) {
            escapedData = escapedData.replace("\"", "\"\"");
            escapedData = "\"" + escapedData + "\"";
        }
        return escapedData;
    }

    public void importContacts(User user, MultipartFile file) throws IOException {
        long lineCount = 0;
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean firstLine = true;
            List<Contact> contacts = new ArrayList<>();
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                
                lineCount++;
                if (firstLine) {
                    firstLine = false; 
                    continue;
                }
                // Regex to split by comma but ignore commas inside quotes
                String[] data = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
                
                if (data.length < 5) {
                     throw new IllegalArgumentException("Invalid CSV format. Row must contain at least 5 columns (First Name, Last Name, Email, Phone, Title).");
                }

                Contact contact = new Contact();
                contact.setUser(user);
                contact.setFirstName(cleanup(data[0]));
                contact.setLastName(cleanup(data[1]));
                contact.setEmail(cleanup(data[2]));
                contact.setPhone(cleanup(data[3]));
                contact.setTitle(cleanup(data[4]));
                if (data.length > 5 && !data[5].isEmpty()) {
                        contact.setImage(cleanup(data[5]));
                }
                contacts.add(contact);
            }

            if (contacts.isEmpty() && lineCount <= 1) {
                 throw new IllegalArgumentException("CSV file is empty or contains only headers.");
            }

            contactRepo.saveAll(contacts);
        }
    }

    private String cleanup(String data) {
        if (data == null) return "";
        String cleaned = data.trim();
        if (cleaned.startsWith("\"") && cleaned.endsWith("\"")) {
            cleaned = cleaned.substring(1, cleaned.length() - 1);
            cleaned = cleaned.replace("\"\"", "\"");
        }
        return cleaned;
    }
   
}
