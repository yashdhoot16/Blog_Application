package com.blogapp.main.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.blogapp.main.configurations.AppConstants;
import com.blogapp.main.payloads.ApiResponse;
import com.blogapp.main.payloads.PostDTO;
import com.blogapp.main.payloads.PostResponse;
import com.blogapp.main.services.FileService;
import com.blogapp.main.services.PostService;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/")
public class PostController {

	@Autowired
	private PostService postService;

	@Autowired
	private FileService fileService;

	@Value("${project.images}")
	private String path;

	// Create post..
	@PostMapping("/user/{userId}/category/{categoryId}/posts")
	public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDto, @PathVariable long userId,
			@PathVariable Long categoryId) {

		PostDTO creatPost = this.postService.createPost(postDto, userId, categoryId);
		return new ResponseEntity<PostDTO>(creatPost, HttpStatus.CREATED);

	}

	// Get By User..
	@GetMapping("/user/{userId}/posts")
	public ResponseEntity<PostResponse> getPostsByUser(@PathVariable Long userId,
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir) {

		PostResponse postResponse = this.postService.getPostsByUser(userId, pageNumber, pageSize, sortBy, sortDir);

		return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
	}

	// Get By Category..
	@GetMapping("/category/{categoryId}/posts")
	public ResponseEntity<PostResponse> getPostsByCategory(@PathVariable Long categoryId,
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir) {

		PostResponse postResponse = this.postService.getPostsByCategory(categoryId, pageNumber, pageSize, sortBy,
				sortDir);

		return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
	}

	// Get all posts...
	@GetMapping("/posts")
	public ResponseEntity<PostResponse> getAllPosts(
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir) {

		PostResponse postResponse = this.postService.getAllPosts(pageNumber, pageSize, sortBy, sortDir);

		return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
	}

	// Get post by ID...
	@GetMapping("/posts/{postId}")
	public ResponseEntity<PostDTO> getPostByID(@PathVariable Long postId) {

		PostDTO postDto = this.postService.getPostById(postId);

		return new ResponseEntity<PostDTO>(postDto, HttpStatus.OK);
	}

	// Update post..
	@PutMapping("/posts/{postId}")
	public ResponseEntity<PostDTO> updatePost(@RequestBody PostDTO postDto, @PathVariable Long postId) {

		PostDTO updatedPostDTO = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDTO>(updatedPostDTO, HttpStatus.OK);
	}

	// Delete Post..
	@DeleteMapping("/posts/{postId}")
	public ResponseEntity<ApiResponse> deletePost(@PathVariable Long postId) {

		this.postService.deletePost(postId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Post deleted successfully..", true), HttpStatus.OK);
	}

	// Search Post
	@GetMapping("/posts/search/{keywords}")
	public ResponseEntity<List<PostDTO>> searchPostByTitle(@PathVariable String keywords) {

		List<PostDTO> postDtos = this.postService.searchPost(keywords);

		return new ResponseEntity<List<PostDTO>>(postDtos, HttpStatus.OK);
	}

	// Upload Image..
	@PostMapping("/post/image/upload/{postId}")
	public ResponseEntity<PostDTO> uploadPostImage(@RequestParam("image") MultipartFile image,
			@PathVariable Long postId) throws IOException {

		PostDTO postDto = this.postService.getPostById(postId);
		String fileName = this.fileService.uploadImage(path, image);
		postDto.setImageName(fileName);
		PostDTO updatePost = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDTO>(updatePost, HttpStatus.OK);
	}

	// Serve Image..
	@GetMapping(value = "/post/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(@PathVariable("imageName") String imageName, HttpServletResponse response)
			throws IOException {

			InputStream resource = this.fileService.getResource(path, imageName);
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		    StreamUtils.copy(resource,response.getOutputStream());
	}
}
