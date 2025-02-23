package com.blogapp.main.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@Setter
@Getter
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long categoryId;
	
	@Column(length = 100, nullable = false)
	private String categoryTitle;
	
	@Column
	private String categoryDescription;
	
	@OneToMany(mappedBy = "category" , cascade = CascadeType.ALL)
	private List<Post> posts = new ArrayList<>();
	 

}
