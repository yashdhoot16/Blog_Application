package com.blogapp.main.services;

import java.util.List;
import com.blogapp.main.payloads.CategoryDTO;

public interface CategoryService {
	
	//Crate Category Method
	CategoryDTO createCategory(CategoryDTO categoryDto);
	
	//Update Category Method
	CategoryDTO updateCategory(CategoryDTO categoryDto, long categoryId);
	
	//Delete Category Method
	void deleteCategory(long categoryId);
	
	//Get Category method
	CategoryDTO getCategory(long categoryId);
	
	//Get All Category Method
	List<CategoryDTO> getAllCategories();

}
