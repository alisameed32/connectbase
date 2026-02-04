package com.connectbase.backend.repo;

import com.connectbase.backend.model.Contact;
import com.connectbase.backend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ContactRepoTest {

    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private UserRepo userRepo;

    private User user;

    @BeforeEach
    void setUp() {
        // Create a dummy user for testing
        user = new User();
        user.setEmail("test@example.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword("password");
        userRepo.save(user);

        // Create dummy contacts
        Contact contact1 = new Contact();
        contact1.setFirstName("Alice");
        contact1.setLastName("Smith");
        contact1.setEmail("alice@test.com");
        contact1.setPhone("1234567890");
        contact1.setUser(user);
        contactRepo.save(contact1);

        Contact contact2 = new Contact();
        contact2.setFirstName("Bob");
        contact2.setLastName("Jones");
        contact2.setEmail("bob@test.com");
        contact2.setPhone("0987654321");
        contact2.setUser(user);
        contactRepo.save(contact2);
    }

    @Test
    void shouldFindContactByKeyword() {
        // Test the custom search query
        Page<Contact> result = contactRepo.searchContacts(user, "Alice", PageRequest.of(0, 10));

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getFirstName()).isEqualTo("Alice");
    }

    @Test
    void shouldNotFindContactForOtherUser() {
        // Create another user
        User otherUser = new User();
        otherUser.setEmail("other@example.com");
        userRepo.save(otherUser);

        // Search with the other user
        Page<Contact> result = contactRepo.searchContacts(otherUser, "Alice", PageRequest.of(0, 10));

        assertThat(result.getContent()).isEmpty();
    }
}