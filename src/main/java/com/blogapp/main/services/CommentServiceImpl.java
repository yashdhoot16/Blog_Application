package com.blogapp.main.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blogapp.main.entities.Comment;
import com.blogapp.main.entities.Post;
import com.blogapp.main.exceptions.ResourceNotFoundException;
import com.blogapp.main.payloads.CommentDTO;
import com.blogapp.main.repositories.CommentRepository;
import com.blogapp.main.repositories.PostRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CommentDTO createComment(CommentDTO commentDto, Long postId) {

		Post post = this.postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "post id ", postId));

		Comment comment = this.modelMapper.map(commentDto, Comment.class);

		comment.setPost(post);

		Comment savedComment = this.commentRepository.save(comment);

		return this.modelMapper.map(savedComment, CommentDTO.class);
	}

	@Override
	public void deleteComment(Long commentId) {

		Comment comment = this.commentRepository.findById(commentId)
				.orElseThrow(() -> new ResourceNotFoundException("Comment", "comment Id ", commentId));

		this.commentRepository.delete(comment);

	}

}
