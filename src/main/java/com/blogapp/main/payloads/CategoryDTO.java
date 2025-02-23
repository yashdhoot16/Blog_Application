package com.blogapp.main.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class CategoryDTO {
	
	private long categoryId;
	
	@NotBlank
	@Size(min = 4, message = "Title length should be minimum of 4 characters !!")
	private String categoryTitle;
	
	@NotBlank
	@Size(min = 20, message = "Description should contain at least 20 charaters !!")
	private String categoryDescription;

}
