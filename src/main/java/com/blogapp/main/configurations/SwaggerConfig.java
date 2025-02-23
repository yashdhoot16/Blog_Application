package com.blogapp.main.configurations;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.In;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;

@Configuration
public class SwaggerConfig {

	 public static final String SECURITY_SCHEME_NAME = "JWT";
	
	@Bean
	public GroupedOpenApi publicApi() {
		return GroupedOpenApi.builder()
				.group("public")
				.pathsToMatch("/**") // Include all endpoints in the documentation
				.build();
	}

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.info(new Info()
				.title("Blog Application API")
				.version("1.0.0")
				.description("API documentation for the Blog Application")
				.contact(new Contact().name("Yash Dhoot").email("dhootyash93@gmail.com"))
				.license(new License().name("Apache 2.0")
						.url("https://www.apache.org/licenses/LICENSE-2.0")))
				.addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
				.components(new Components()
						.addSecuritySchemes(SECURITY_SCHEME_NAME, 
								new SecurityScheme()
								.name(SECURITY_SCHEME_NAME)
								.type(Type.HTTP)
								.in(In.HEADER)
								.scheme("bearer")
								.bearerFormat("JWT")));
	}
	
	
	
}
