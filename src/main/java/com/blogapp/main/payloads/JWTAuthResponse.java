package com.blogapp.main.payloads;

import lombok.Data;

@Data
public class JWTAuthResponse {
	
	private String token;
	
	private UserDTO userDto;

}
