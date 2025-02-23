package com.blogapp.main.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blogapp.main.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);
}
