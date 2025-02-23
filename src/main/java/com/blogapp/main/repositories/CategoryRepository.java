package com.blogapp.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blogapp.main.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
