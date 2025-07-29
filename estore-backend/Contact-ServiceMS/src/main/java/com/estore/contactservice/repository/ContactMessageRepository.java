package com.estore.contactservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.estore.contactservice.model.ContactMessage;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

}
