package com.estore.contactservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableDiscoveryClient
@SpringBootApplication
@EntityScan("com.estore.contactservice.model")
@EnableJpaRepositories("com.estore.contactservice.repository")
public class ContactServiceMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactServiceMsApplication.class, args);
	}

}
