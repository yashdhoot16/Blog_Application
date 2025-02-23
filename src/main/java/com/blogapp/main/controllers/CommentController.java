package com.blogapp.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.blogapp.main.payloads.ApiResponse;
import com.blogapp.main.payloads.CommentDTO;
import com.blogapp.main.services.CommentService;

@RestController
@RequestMapping("/api/")
public class CommentController {

	@Autowired
	private CommentService commentService;

	// Create Comment..
	@PostMapping("/post/{postId}/comments")
	public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDto, @PathVariable Long postId) {

		CommentDTO createComment = this.commentService.createComment(commentDto, postId);

		return new ResponseEntity<CommentDTO>(createComment, HttpStatus.CREATED);
	}

	// Delete Comment
	@DeleteMapping("/comments/{commentId}")
	public ResponseEntity<ApiResponse> deleteComment(@PathVariable Long commentId) {

		this.commentService.deleteComment(commentId);

		return new ResponseEntity<ApiResponse>(new ApiResponse("comment deleted successfully..", true), HttpStatus.OK);
	}

}
