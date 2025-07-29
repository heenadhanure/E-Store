package com.estore.repairservice.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name="repair_requests")
public class RepairRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String contact;
	private String email;
	private String deviceType;
	
	@Column(length = 1000)
	private String issue;
	
	private String preferredTime;

	private String status = "PENDING"; // default
	
	private LocalDateTime requestTime;
	
	//Constructor
	public RepairRequest() {
		this.requestTime = LocalDateTime.now();
	}
	
}
