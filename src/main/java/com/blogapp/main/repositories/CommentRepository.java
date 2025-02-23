package com.blogapp.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blogapp.main.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
