package mr.municipality.sec;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MVCProperties extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/app/chat/send").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS");
        registry.addMapping("/app/chat").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS");
        registry.addMapping("/userses").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS");
        registry.addMapping("/login").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS");
        registry.addMapping("/signup").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS");
        registry.addMapping("/categories").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS");
    }
}
