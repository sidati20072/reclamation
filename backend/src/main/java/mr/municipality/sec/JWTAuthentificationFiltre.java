package mr.municipality.sec;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mr.municipality.entities.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTAuthentificationFiltre extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;
	
	public JWTAuthentificationFiltre(AuthenticationManager authenticationManager) {
		super();
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request , HttpServletResponse reponse)  {
		
		User user = null;
		try {
			user = new ObjectMapper().readValue(request.getInputStream(), User.class);
			
		}catch(Exception e) {
			
			throw new RuntimeException(e);
			
		}
		
		return authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						user.getUsername(),
						user.getPassword()
						));
	}
	
	/*
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

	}
	
	*/
	@Override
	protected void successfulAuthentication(HttpServletRequest request , HttpServletResponse reponse , FilterChain chain,Authentication authResult) throws IOException , ServletException{

		org.springframework.security.core.userdetails.User springUser =  (org.springframework.security.core.userdetails.User) authResult.getPrincipal();
		
		String jwtToken=Jwts.builder()
				.setSubject(springUser.getUsername())
				.setExpiration(new Date(System.currentTimeMillis()+SecurityConstants.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
				.claim("roles", authResult.getAuthorities())
				.compact();
		
		
		System.out.println("***********ajout header token ******* ");
		System.out.println(authResult.getName());
		System.out.println(jwtToken);
		
		reponse.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX+jwtToken);
		
		
		System.out.println("************ ici fin seccessf**********");
	}
	
	
	
}
