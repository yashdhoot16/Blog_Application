package com.blogapp.main.payloads;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class PostResponse {

	private List<PostDTO> content;

	private long pageNumber;

	private long pageSize;

	private long totalElements;

	private long totalPages;

	private boolean lastPage;

}
