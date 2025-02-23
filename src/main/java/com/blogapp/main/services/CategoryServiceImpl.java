package com.blogapp.main.services;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blogapp.main.entities.Category;
import com.blogapp.main.exceptions.ResourceNotFoundException;
import com.blogapp.main.payloads.CategoryDTO;
import com.blogapp.main.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private ModelMapper modelMapper;

	// ---------Method to create new category-----------
	@Override
	public CategoryDTO createCategory(CategoryDTO categoryDto) {
		Category category = this.modelMapper.map(categoryDto, Category.class);
		Category updatedCategory = categoryRepository.save(category);

		return this.modelMapper.map(updatedCategory, CategoryDTO.class);
	}

	// ---------Method to update existing category-----------
	@Override
	public CategoryDTO updateCategory(CategoryDTO categoryDto, long categoryId) {
		Category category = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", " category id ", categoryId));

		category.setCategoryTitle(categoryDto.getCategoryTitle());
		category.setCategoryDescription(categoryDto.getCategoryDescription());

		Category updateCategory = categoryRepository.save(category);

		return this.modelMapper.map(updateCategory, CategoryDTO.class);
	}

	// ---------Method to deletes category-----------
	@Override
	public void deleteCategory(long categoryId) {
		Category category = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", " category id ", categoryId));

		this.categoryRepository.delete(category);

	}

	// ---------Method to fetch category-----------
	@Override
	public CategoryDTO getCategory(long categoryId) {
		Category category = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", " category id ", categoryId));

		return this.modelMapper.map(category, CategoryDTO.class);
	}

	// ---------Method to fetch all categories-----------
	@Override
	public List<CategoryDTO> getAllCategories() {

		List<Category> categories = this.categoryRepository.findAll();

		List<CategoryDTO> categoryDTOs = categories.stream().map(category -> this.modelMapper.map(category, CategoryDTO.class))
				.collect(Collectors.toList());

		return categoryDTOs;
	}

}
