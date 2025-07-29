package com.estore.userservice.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estore.userservice.dto.UserDTO;
import com.estore.userservice.model.User;
import com.estore.userservice.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public User registerUser(UserDTO userDto) {
		if(userRepo.findByEmail(userDto.getEmail()).isPresent()) {
			throw new RuntimeException("Email already registered!");
		}
		User user = new User();
		BeanUtils.copyProperties(userDto, user);
		return userRepo.save(user);
	}
	
	@Override
	public User loginUser(String email, String password) {
		return userRepo.findByEmail(email)
				.filter(u->u.getPassword().equals(password))
				.orElseThrow(()->new RuntimeException("Invalid Credentials"));
	}
	
	@Override
	public User getUserById(Long id) {
		return userRepo.findById(id)
				.orElseThrow(()-> new RuntimeException("User not found"));
	}
	
	@Override
	public User updateUser(Long id, UserDTO userDto) {
		User existing = getUserById(id);
		BeanUtils.copyProperties(userDto,existing);
		existing.setId(id);
		return userRepo.save(existing);
	}

	@Override
	public User findByEmailOrPhone(String target) {
		 return userRepo.findByEmail(target)
		           .orElse(userRepo.findByContact(target).orElse(null));
	}

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}

	
}
