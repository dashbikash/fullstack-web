package dashbikash.spring.fullstack.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dashbikash.spring.fullstack.model.User;
import dashbikash.spring.fullstack.model.UserRepo;
import dashbikash.spring.fullstack.security.JwtService;

@RestController
public class UserController {
	@Autowired
	private JwtService jwtService;	
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private UserRepo userRepo;
	
	
	@PostMapping(path="/register",consumes = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Object> register(@RequestBody User user){
		User existUser=userRepo.getUserbyUserName(user.getUsername());
		if(existUser!=null) {
			return ResponseEntity.status(409).body("User already exist");
		}
		
		userRepo.insertUser(user);
		return ResponseEntity.ok("User Created");
	}
	
	@PostMapping(path="/authenticate",consumes = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Object> authenticate(@RequestBody Map<String, String> credentials){
		UserDetails userDetails= userDetailsService.loadUserByUsername(credentials.get("username"));

	
		if(userDetails!=null && userDetails.getPassword().equals(credentials.get("password"))) {
			return ResponseEntity.ok(jwtService.generateToken(credentials.get("username")));
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials.");
		}
		
	}
}
