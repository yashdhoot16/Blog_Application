package com.blogapp.main.services;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blogapp.main.configurations.AppConstants;
import com.blogapp.main.entities.Role;
import com.blogapp.main.entities.User;
import com.blogapp.main.exceptions.ResourceNotFoundException;
import com.blogapp.main.exceptions.handleDuplicateEmailException;
import com.blogapp.main.payloads.UserDTO;
import com.blogapp.main.repositories.RoleRepository;
import com.blogapp.main.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;

	// -----Method to register User----
	@Override
	public UserDTO registerUser(UserDTO userDto) {
		
		if (userRepository.existsByEmail(userDto.getEmail())) {
			throw new handleDuplicateEmailException("Email already in use. Please choose a different email.");
		}

		User user = this.modelMapper.map(userDto, User.class);

		// encoded the password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));

		// fetching role by ID saved in AppConstants..
		Role role = this.roleRepository.findById(AppConstants.NORMAL_USER).get();

		// add role to the user..
		user.getRoles().add(role);

		User newUser = this.userRepository.save(user);

		return this.modelMapper.map(newUser, UserDTO.class);
	}

	// ------Method to create new user--------
	@Override
	public UserDTO createUser(UserDTO userDto) {
		User user = this.dtoToUser(userDto);

		User savedUser = this.userRepository.save(user);

		return userToUserDTO(savedUser);
	}

	// ---------Method to update existing user------
	@Override
	public UserDTO updateUser(UserDTO userDto, long userId) {
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User ", " Id ", userId));

		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setAbout(userDto.getAbout());

		User updatedUser = this.userRepository.save(user);

		return userToUserDTO(updatedUser);

	}

	// -------Method to get user details by user-id-----------
	@Override
	public UserDTO getUserById(long userId) {
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User ", " Id ", userId));

		return this.userToUserDTO(user);
	}

	// ---------Method to get all user's details using List-----------
	@Override
	public List<UserDTO> getAllUsers() {

		List<User> users = this.userRepository.findAll();

//		// Create an empty list to hold UserDTOs
//		List<UserDTO> userDtos = new ArrayList<>();
//
//		// Iterate over the list of users
//		for (User user : users) {
//			UserDTO userDto = this.userToUserDTO(user); // Convert User to UserDTO
//			userDtos.add(userDto); // Add the converted object to the list
//		}

		// Use Stream API to map users to UserDTO
		List<UserDTO> userDtos = users.stream().map(user -> this.userToUserDTO(user)).collect(Collectors.toList());

		return userDtos;
	}

	// --------------Method to delete user by user-id-----------
	@Override
	public void deleteUser(long userId) {

		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User ", " Id ", userId));

		// Clear roles association
		user.getRoles().clear();
		userRepository.save(user);

		this.userRepository.delete(user);

	}

	public User dtoToUser(UserDTO userDto) {
		User user = this.modelMapper.map(userDto, User.class);

//		User user = new User();
//		user.setId(userDto.getId());
//		user.setName(userDto.getName());
//		user.setEmail(userDto.getEmail());
//		user.setPassword(userDto.getPassword());
//		user.setAbout(userDto.getAbout());

		return user;

	}

	public UserDTO userToUserDTO(User user) {
		UserDTO userDto = this.modelMapper.map(user, UserDTO.class);

//		UserDTO userDto = new UserDTO();
//		userDto.setId(user.getId());
//		userDto.setName(user.getName());
//		userDto.setEmail(user.getEmail());
//		userDto.setPassword(user.getPassword());
//		userDto.setAbout(user.getAbout());

		return userDto;
	}

}
