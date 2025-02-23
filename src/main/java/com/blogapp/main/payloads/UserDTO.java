package com.blogapp.main.payloads;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class UserDTO {
	
	private long id;
	
	@NotEmpty(message = "Username should not be empty")
	@Size(min=4, message = "Username must contain at leat 4 characters !!")
	private String name;
	
	@NotEmpty(message = "Email should not be empty")
	@Email(message = "Email is invalid !!")
	private String email;
	
	@NotEmpty(message = "Password should not be empty")
	@Size(min=6, max = 10, message = "Password must contain 6 to 10 characters !!")
	private String password;
	
	@NotEmpty(message = "Should not be empty")
	@Size(min=15, max=200, message = "This section contains something about yourself.. Please fill this section with min 20 words..!!")
	private String about;
	
	private Set<RoleDTO> roles = new HashSet<>();
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

}
