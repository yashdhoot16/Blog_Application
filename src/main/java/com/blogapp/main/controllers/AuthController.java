package com.blogapp.main.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.blogapp.main.entities.User;
import com.blogapp.main.payloads.JWTAuthRequest;
import com.blogapp.main.payloads.JWTAuthResponse;
import com.blogapp.main.payloads.UserDTO;
import com.blogapp.main.security.JWTTokenHelper;
import com.blogapp.main.services.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private JWTTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserService userService;

	// register new user api
	@PostMapping("/register")
	public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserDTO userDto) {
		UserDTO registerdUser = this.userService.registerUser(userDto);
		return new ResponseEntity<UserDTO>(registerdUser, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<JWTAuthResponse> createToken(@RequestBody JWTAuthRequest request) throws Exception {

		this.authenticate(request.getUsername(), request.getPassword());

		UserDetails userDetail = this.userDetailsService.loadUserByUsername(request.getUsername());

		String token = this.jwtTokenHelper.generateToken(userDetail);

		JWTAuthResponse response = new JWTAuthResponse();
		response.setUserDto(this.mapper.map((User)userDetail, UserDTO.class));
		response.setToken(token);

		return new ResponseEntity<JWTAuthResponse>(response, HttpStatus.OK);

	}

	private void authenticate(String username, String password) throws Exception {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);

		try {
			this.authenticationManager.authenticate(authenticationToken);

		} catch (BadCredentialsException e) {
			throw new com.blogapp.main.exceptions.BadCredentialsException("Username", "password");
		}
	}
}
