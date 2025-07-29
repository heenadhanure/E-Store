package com.estore.contactservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estore.contactservice.model.ContactMessage;
import com.estore.contactservice.repository.ContactMessageRepository;

@RestController
@RequestMapping("/contact")
public class ContactMessageController {

	@Autowired
	private ContactMessageRepository repository;
	
	@PostMapping
	public ResponseEntity<?> saveMessage(@RequestBody ContactMessage message) {
	    System.out.println("Received message: " + message);
	    ContactMessage saved = repository.save(message);
	    System.out.println("Saved: " + saved);
	    return ResponseEntity.ok().body("Message saved!");
	}
}
