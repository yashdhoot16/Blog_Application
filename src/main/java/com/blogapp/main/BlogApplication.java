package com.blogapp.main;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.blogapp.main.configurations.AppConstants;
import com.blogapp.main.entities.Role;
import com.blogapp.main.repositories.RoleRepository;

@SpringBootApplication
public class BlogApplication implements CommandLineRunner {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println(this.passwordEncoder.encode("pass123"));

		Role role1 = new Role();
		role1.setRoleId(AppConstants.ADMIN_USER);
		role1.setRoleName("ROLE_ADMIN");

		Role role2 = new Role();
		role2.setRoleId(AppConstants.NORMAL_USER);
		role2.setRoleName("ROLE_NORMAL");

		List<Role> roles = List.of(role1, role2);

		List<Role> result = this.roleRepository.saveAll(roles);

		// this is optional to print roles on console..
		result.forEach(r -> {
			System.out.println(r.getRoleName());
		});
	}

}
