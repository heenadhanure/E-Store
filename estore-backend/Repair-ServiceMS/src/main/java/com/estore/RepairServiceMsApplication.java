package com.estore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class RepairServiceMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RepairServiceMsApplication.class, args);
	}

}
