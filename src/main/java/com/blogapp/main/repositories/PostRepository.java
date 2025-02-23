package com.blogapp.main.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blogapp.main.entities.Category;
import com.blogapp.main.entities.Post;
import com.blogapp.main.entities.User;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	Page<Post> findByUser(User user, Pageable pageable);

	Page<Post> findByCategory(Category category, Pageable pageable);

	List<Post> findByTitleContaining(String title);
	
}
