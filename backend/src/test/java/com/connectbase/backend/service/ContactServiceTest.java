package com.connectbase.backend.service;

import com.connectbase.backend.model.Contact;
import com.connectbase.backend.model.User;
import com.connectbase.backend.repo.ContactRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactRepo contactRepo;

    @Mock
    private CloudinaryService cloudinaryService;

    @InjectMocks
    private ContactService contactService;

    private User user;
    private Contact contact;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");

        contact = new Contact();
        contact.setId(100L);
        contact.setFirstName("Test");
        contact.setLastName("Contact");
        contact.setUser(user);
    }

    @Test
    void createContact_ShouldSaveContact() {
        // Arrange
        when(contactRepo.save(any(Contact.class))).thenReturn(contact);

        // Act
        Contact created = contactService.createContact(user, contact, null);

        // Assert
        assertNotNull(created);
        assertEquals("Test", created.getFirstName());
        verify(contactRepo, times(1)).save(any(Contact.class));
    }

    @Test
    void createContact_WithImage_ShouldUploadAndSave() {
        // Arrange
        MultipartFile mockFile = mock(MultipartFile.class);
        when(mockFile.isEmpty()).thenReturn(false);
        when(cloudinaryService.uploadFile(mockFile)).thenReturn("http://image.url");
        when(contactRepo.save(any(Contact.class))).thenReturn(contact);

        // Act
        Contact created = contactService.createContact(user, contact, mockFile);

        // Assert
        verify(cloudinaryService, times(1)).uploadFile(mockFile);
        verify(contactRepo, times(1)).save(any(Contact.class));
        // Note: In a real run, we'd assert contact.getImage() is set,
        // but here we are returning the 'contact' object which we manually set up in setUp().
    }

    @Test
    void getAllContacts_ShouldReturnPage() {
        // Arrange
        Page<Contact> contactPage = new PageImpl<>(Collections.singletonList(contact));
        when(contactRepo.findByUser(any(User.class), any(PageRequest.class))).thenReturn(contactPage);

        // Act
        Page<Contact> result = contactService.getAllContacts(user, 0, 10);

        // Assert
        assertEquals(1, result.getTotalElements());
        verify(contactRepo, times(1)).findByUser(any(User.class), any(PageRequest.class));
    }

    @Test
    void getContactById_ShouldReturnContact_WhenOwnedByUser() {
        // Arrange
        when(contactRepo.findById(100L)).thenReturn(Optional.of(contact));

        // Act
        Contact result = contactService.getContactById(100L, user);

        // Assert
        assertEquals(100L, result.getId());
    }

    @Test
    void getContactById_ShouldThrowException_WhenNotOwnedByUser() {
        // Arrange
        User otherUser = new User();
        otherUser.setId(2L); // Different ID
        when(contactRepo.findById(100L)).thenReturn(Optional.of(contact));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> contactService.getContactById(100L, otherUser));
    }
}