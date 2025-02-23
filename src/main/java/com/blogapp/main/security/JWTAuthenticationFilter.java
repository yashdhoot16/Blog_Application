package com.blogapp.main.security;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JWTTokenHelper jwtTokenHelper;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		// Log the Authorization header for debugging
	    System.out.println("Authorization Header: " + request.getHeader("Authorization"));

		// 1. Get token from request..
		String requestToken = request.getHeader("Authorization"); // Bearer 2352523sdgsg..
																	// Actual token..
		System.out.println(requestToken);

		String username = null;
		String token = null;

		if (requestToken != null && requestToken.startsWith("Bearer")) {

			token = requestToken.substring(7); // token without bearer..

			// Fetching user from token..
			try {
				username = this.jwtTokenHelper.getUsernameFromToken(token);
			} catch (IllegalArgumentException e) {
				System.out.println("Illegal Argument while fetching the username !!");
			} catch (ExpiredJwtException e) {
				System.out.println("Given jwt token is expired !!");
			} catch (MalformedJwtException e) {
				System.out.println("Some changed has done in token !! Invalid Token");
			}
		} else {
			System.out.println("Invalid Header Value !! JWT token does not begin with Bearer..");
		}

		// Once we get the token, then we have to validate..

		// 2. Token Validation..
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			// 3. Load user associated with token..
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
			Boolean validateToken = this.jwtTokenHelper.validateToken(token, userDetails);
			// here token is being validated..
			if (validateToken) {
				// Token is valid
				// Authentication needs to be done here..
				// 4. set authentication..(Spring Security)
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null , userDetails.getAuthorities());
				
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

			}
			else 
			{
				System.out.println("Invalid JWT token !!");
			}
		} 
		else 
		{
			System.out.println("Either Username is null or contect is not null..");
		}
		
		filterChain.doFilter(request, response);

	}

}
