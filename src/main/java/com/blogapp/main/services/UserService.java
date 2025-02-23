package com.blogapp.main.services;

import java.util.List;
import com.blogapp.main.payloads.UserDTO;

public interface UserService {

	UserDTO registerUser(UserDTO userDto);

	UserDTO createUser(UserDTO userDto);

	UserDTO updateUser(UserDTO userDto, long userId);

	UserDTO getUserById(long userId);

	List<UserDTO> getAllUsers();

	public void deleteUser(long userId);
}
