package com.blogapp.main.exceptions;

public class BadCredentialsException extends RuntimeException {

	String fieldName1;
	String fieldName2;

	public BadCredentialsException(String fieldName1, String fieldName2) {
		super(String.format("%s or %s is incorrect !! ", fieldName1, fieldName2));
		this.fieldName1 = fieldName1;
		this.fieldName2 = fieldName2;

	}

}
