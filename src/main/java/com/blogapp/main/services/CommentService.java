package com.blogapp.main.services;

import com.blogapp.main.payloads.CommentDTO;

public interface CommentService {
	
	CommentDTO createComment(CommentDTO commentDto,Long postId);
	
	void deleteComment(Long commentId);

}
