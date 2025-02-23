package com.blogapp.main.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.blogapp.main.entities.Category;
import com.blogapp.main.entities.Post;
import com.blogapp.main.entities.User;
import com.blogapp.main.exceptions.ResourceNotFoundException;
import com.blogapp.main.payloads.PostDTO;
import com.blogapp.main.payloads.PostResponse;
import com.blogapp.main.repositories.CategoryRepository;
import com.blogapp.main.repositories.PostRepository;
import com.blogapp.main.repositories.UserRepository;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	// Create Post..
	@Override
	public PostDTO createPost(PostDTO postDto, long userId, Long categoryId) {

		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User ", "user id ", userId));

		Category category = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", "category id ", categoryId));

		Post post = this.modelMapper.map(postDto, Post.class);

		// As we will get only title and content from user as input in PostDTO hence we
		// need to set rest properties..
		post.setImageName("default.png");
		post.setPostDate(new Date());
		post.setCategory(category);
		post.setUser(user);

		Post newPost = postRepository.save(post);

		return this.modelMapper.map(newPost, PostDTO.class);
	}

	// Update Post..
	@Override
	public PostDTO updatePost(PostDTO postDto, Long postId) {

		Post post = this.postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post ", "post id ", postId));
		
		Category category = this.categoryRepository.findById(postDto.getCategory().getCategoryId()).get();

		post.setTitle(postDto.getPostTitle());
		post.setPostContent(postDto.getPostContent());
		post.setImageName(postDto.getImageName());
		post.setCategory(category);

		Post updatedPost = this.postRepository.save(post);

		return this.modelMapper.map(updatedPost, PostDTO.class);
	}

	// Delete Post..
	@Override
	public void deletePost(Long postId) {
		Post post = this.postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "post id ", postId));

		this.postRepository.delete(post);
	}

	// Get All Posts..
	@Override
	public PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {

		// Sorting functionality..
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

		Page<Post> pagePost = this.postRepository.findAll(pageable);

		List<Post> posts = pagePost.getContent();

		List<PostDTO> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDTO.class))
				.collect(Collectors.toList());

		PostResponse postResponse = new PostResponse();
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());

		return postResponse;
	}

	// Get Post By Id..
	@Override
	public PostDTO getPostById(Long postId) {

		Post post = this.postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post ", "post id ", postId));

		return this.modelMapper.map(post, PostDTO.class);
	}

	// Get Posts by Category..
	@Override
	public PostResponse getPostsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy,
			String sortDir) {

		// Fetching category data by category ID...
		Category category = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", "category id ", categoryId));

		// Sort functionality..
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		// Setting up pagination
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

		// Fetching posts for the given category with pagination
		Page<Post> pagePost = this.postRepository.findByCategory(category, pageable);

		// Getting content in list of posts from Page<Post> which is sublist basically..
		List<Post> posts = pagePost.getContent();

		// Transferring data from Post to PostDTO using stream API and Map collection...
		List<PostDTO> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDTO.class))
				.collect(Collectors.toList());

		// Setting data in postResponse and returning postResponse..
		PostResponse postResponse = new PostResponse();
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());

		return postResponse;
	}

	// Get Posts by User...
	@Override
	public PostResponse getPostsByUser(Long userId, Integer pageNumber, Integer pageSize, String sortBy,
			String sortDir) {

		// Fetching User data by User ID...
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User ", "user id ", userId));

		// Sort functionality..
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		// Setting up pagination..
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

		// Fetching posts for the given user with pagination..
		Page<Post> pagePost = this.postRepository.findByUser(user, pageable);

		// Getting content in list of posts from Page<Post> which is sublist basically..
		List<Post> posts = pagePost.getContent();

		// Transferring data from Post to PostDTO using stream API and Map collection...
		List<PostDTO> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDTO.class))
				.collect(Collectors.toList());

		// Setting data in postResponse and returning postResponse..
		PostResponse postResponse = new PostResponse();
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());

		return postResponse;
	}

	// Search Post..
	@Override
	public List<PostDTO> searchPost(String keyword) {
		List<Post> posts = this.postRepository.findByTitleContaining(keyword);

		List<PostDTO> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDTO.class))
				.collect(Collectors.toList());

		return postDtos;
	}

}
