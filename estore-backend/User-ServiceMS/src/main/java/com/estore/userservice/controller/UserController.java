package com.estore.userservice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estore.userservice.dto.UserDTO;
import com.estore.userservice.model.User;
import com.estore.userservice.repository.UserRepository;
import com.estore.userservice.service.OtpService;
import com.estore.userservice.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private OtpService otpService;
	
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody UserDTO userDto){
		return ResponseEntity.ok(userService.registerUser(userDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody Map<String, String> credentials){
		String email = credentials.get("email");
		String password = credentials.get("password");
		return ResponseEntity.ok(userService.loginUser(email, password));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getProfile(@PathVariable Long id){
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<User> updateProfile(@PathVariable Long id, @RequestBody UserDTO userDto){
		return ResponseEntity.ok(userService.updateUser(id, userDto));
	}
	
	@PostMapping("/generate-otp")
    public ResponseEntity<String> generateOtp(@RequestBody Map<String, String> payload) {
        String target = payload.get("target");
        otpService.generateOtp(target);
        return ResponseEntity.ok("OTP sent to " + target);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> payload) {
        String target = payload.get("target");
        String otp = payload.get("otp");

        boolean isValid = otpService.verifyOtp(target, otp);
        if (!isValid) {
            return ResponseEntity.status(401).body("Invalid or expired OTP");
        }

        // Check if user exists
        User user = userService.findByEmailOrPhone(target);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // ✅ You can return JWT or session info here
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/count")		// For Admin
    public Long getUserCount() {
    	return userRepository.count();
    }
    
    @GetMapping
    public List<User> getUsers(){
    	return userService.getAllUsers();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully.");
    }
}
