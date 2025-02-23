package com.blogapp.main.payloads;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class PostDTO {

	private Long postId;

	@NotBlank
	private String postTitle;

	private String postContent;

	private String imageName;

	private Date postDate;

	private CategoryDTO category;

	private UserDTO user;

	private Set<CommentDTO> comments = new HashSet<>();
}
