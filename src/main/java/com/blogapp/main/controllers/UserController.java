package com.blogapp.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogapp.main.payloads.ApiResponse;
import com.blogapp.main.payloads.UserDTO;
import com.blogapp.main.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	// GET - Fetch users---
	@GetMapping("/")
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		return ResponseEntity.ok(this.userService.getAllUsers());
	}

	// GET - Fetch user by id------
	@GetMapping("/{userId}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable long userId) {
		return ResponseEntity.ok(this.userService.getUserById(userId));
	}

	// POST - Create user----
	@PostMapping("/")
	public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDto) {
		UserDTO createdUserDto = this.userService.createUser(userDto);
		return new ResponseEntity<>(createdUserDto, HttpStatus.CREATED);
	}

	// PUT - Update user-----
	@PutMapping("/{userId}")
	public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody UserDTO userDto, @PathVariable long userId) {
		UserDTO updatedUser = this.userService.updateUser(userDto, userId);
		return ResponseEntity.ok(updatedUser);

	}

	@PreAuthorize("hasRole('ADMIN')")
	// DELETE - Delete user-----
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable long userId) {

		this.userService.deleteUser(userId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("User deleted successfully..", true), HttpStatus.OK);
	}

}
