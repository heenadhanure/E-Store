package com.estore.userservice.dto;

import lombok.Data;

@Data
public class UserDTO {
	private String name;
	private String email;
	private String password;
	private String contact;
	private String address;
}
