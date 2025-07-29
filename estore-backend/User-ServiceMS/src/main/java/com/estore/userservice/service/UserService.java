package com.estore.userservice.service;

import java.util.List;

import com.estore.userservice.dto.UserDTO;
import com.estore.userservice.model.User;

public interface UserService {
	User registerUser(UserDTO userDto);
	User loginUser(String email, String password);
	User getUserById(Long id);
	User updateUser(Long id, UserDTO userDto);
	User findByEmailOrPhone(String emailOrPhone);
	List<User> getAllUsers();
	void deleteUser(Long id);
}
