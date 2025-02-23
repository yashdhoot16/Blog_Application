package com.blogapp.main.exceptions;

public class handleDuplicateEmailException extends RuntimeException {
	
	String message;

	public handleDuplicateEmailException(String message) {
	        super(message);
	        this.message = message;
	    }
}
