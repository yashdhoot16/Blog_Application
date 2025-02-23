package com.blogapp.main.services;

import java.util.List;
import com.blogapp.main.payloads.PostDTO;
import com.blogapp.main.payloads.PostResponse;

public interface PostService {

	// Create Post
	PostDTO createPost(PostDTO posDto, long userId, Long categoryId);

	// Update Post
	PostDTO updatePost(PostDTO postDto, Long postId);

	// Delete Post
	void deletePost(Long postId);

	// Get All Posts
	PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

	// Get Post By ID
	PostDTO getPostById(Long postId);

	// Get All posts by category
	PostResponse getPostsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy,
			String sortDir);

	// Get All posts by user
	PostResponse getPostsByUser(Long userId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

	// Search Post
	List<PostDTO> searchPost(String keyword);

}
