package com.blogapp.main.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.blogapp.main.payloads.ApiResponse;
import com.blogapp.main.payloads.CategoryDTO;
import com.blogapp.main.services.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	// GET - Fetch All Categories---
	@GetMapping("/")
	public ResponseEntity<List<CategoryDTO>> getAllCategories() {
		return ResponseEntity.ok(this.categoryService.getAllCategories());
	}

	// GET - Fetch category by id------
	@GetMapping("/{categoryId}")
	public ResponseEntity<CategoryDTO> getCategory(@PathVariable long categoryId) {
		return ResponseEntity.ok(this.categoryService.getCategory(categoryId));
	}

	// POST - Create Category----
	@PostMapping("/")
	public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDto) {
		CategoryDTO createCategoryDto = this.categoryService.createCategory(categoryDto);
		return new ResponseEntity<CategoryDTO>(createCategoryDto, HttpStatus.CREATED);
	}

	// PUT - Update Category-----
	@PutMapping("/{categoryId}")
	public ResponseEntity<CategoryDTO> updateCategory(@Valid @RequestBody CategoryDTO categoryDto,
			@PathVariable long categoryId) {
		CategoryDTO updatedCategoryDto = this.categoryService.updateCategory(categoryDto, categoryId);
		return new ResponseEntity<CategoryDTO>(updatedCategoryDto, HttpStatus.OK);
	}

	// DELETE - Delete Category-----
	@DeleteMapping("/{categoryId}")
	public ResponseEntity<ApiResponse> deleteCategory(@PathVariable long categoryId) {
		this.categoryService.deleteCategory(categoryId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Category deleted successfully..", true), HttpStatus.OK);
	}
}
