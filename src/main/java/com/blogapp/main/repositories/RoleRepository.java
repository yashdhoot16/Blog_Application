package com.blogapp.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blogapp.main.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{

}
