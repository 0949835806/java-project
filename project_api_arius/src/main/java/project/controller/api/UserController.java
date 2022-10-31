package project.controller.api;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.criteria.CriteriaBuilder.In;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;
import project.models.Role;
import project.models.User;
import project.service.RoleService;
import project.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("/users")
	ResponseEntity<List<User>> getUsers() {
		var authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
		System.out.println(authorities);
		System.out.println(userService.getUsers());
		return ResponseEntity.ok(userService.getUsers());
	}
	
	@GetMapping("/user/{userid}")
	ResponseEntity<Object> getUserById(@PathVariable("userid")Integer userid){
		User u = userService.getById(userid).get();
		return ResponseEntity.ok(u);
	}
	@GetMapping("/user/findByUsername/{username}")
	ResponseEntity<Object> getUserByName(@PathVariable("username") String username){
//		System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAA - " + username);
		User u = userService.findByUsername(username);
		return ResponseEntity.ok(u);
	}
	
	@PostMapping("/user/save")
//	@Procedure(value = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<User> saveUser(@RequestBody User user) {
		System.out.println(user.toString());
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Collection<Role> roles = new ArrayList<>();
		Role role = new Role(2, "ROLE_USER");
		roles.add(role);
		user.setRoles(roles);
		return ResponseEntity.created(uri).body(userService.saveUser(user));
	}
	
	@PostMapping("/user/saveAdmin")
	ResponseEntity<User> saveAdmin(@RequestBody User user){
		System.out.println(user.toString());
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Collection<Role> roles = new ArrayList<>();
		Role role = new Role(1, "ROLE_ADMIN");
		roles.add(role);
		user.setRoles(roles);
		return ResponseEntity.created(uri).body(userService.saveAdmin(user));
	}
	
	@PostMapping("/role/save")
	ResponseEntity<Role> saveRole(@RequestBody Role role) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());
		return ResponseEntity.created(uri).body(userService.saveRole(role));
	}
	
	@PutMapping("/role/addtouser/{roleId}")
	ResponseEntity<User> addRoleToUser(@RequestBody User user, @PathVariable("roleId")Integer roleId) {
		System.out.println(user.toString());
		Role role = roleService.findById(roleId).get();
		user.getRoles().add(role);
		return ResponseEntity.ok(userService.saveAdmin(user));
	}
	@PostMapping("/user/addtouser")
	ResponseEntity<?> addToUser(@RequestBody RoleToUserForm roleto){
		userService.addRoleToUser(roleto.getUsername(), roleto.getRoleId());
		return ResponseEntity.ok("success");
	}
	
	@GetMapping("/token/refresh")
	void refreshToken(HttpServletRequest request, HttpServletResponse response) throws StreamWriteException, DatabindException, IOException {
		String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			
			try {
				String refresh_token = authorizationHeader.substring("Bearer ".length());
				Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
				JWTVerifier verifier = JWT.require(algorithm).build();
				DecodedJWT decodedJWT = verifier.verify(refresh_token);
				String username = decodedJWT.getSubject();
				User user = userService.getUser(username);
				String access_token = JWT.create()
						.withSubject(user.getUsername())
						.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
						.withIssuer(request.getRequestURL().toString())
						.withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
						.sign(algorithm);
				Map<String, String> tokens = new HashMap<>();
				tokens.put("access_token", access_token);
				tokens.put("refresh_token", refresh_token);
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), tokens);
			} catch (Exception e) {
				response.setHeader("error", e.getMessage());
				response.setStatus(HttpStatus.FORBIDDEN.value());
				Map<String, String> error = new HashMap<>();
				error.put("error_message", e.getMessage());
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), error);
			}
		} else {
			throw new RuntimeException("Refresh token is missing");
		}
	}
	
	@PutMapping("/user/edit/{userid}")
	ResponseEntity<User> editUser(@RequestBody User user, @PathVariable("userid")Integer userid) {
		System.out.println(user.toString());
		User u = userService.getById(userid).get();
		u.setUsername(user.getUsername());
		u.setFullName(user.getFullName());
		u.setEmail(user.getEmail());
		u.setPhone(user.getPhone());
		u.setAddress(user.getAddress());
		u.setPassword(user.getPassword());
		return ResponseEntity.ok(userService.saveUser(u));
		
	}
	
	@PutMapping("/user/editAdmin/{userid}")
	ResponseEntity<User> editAdmin(@RequestBody User user, @PathVariable("userid")Integer userid){
		User u = userService.getById(userid).get();
		u.setUsername(user.getUsername());
		u.setFullName(user.getFullName());
		u.setEmail(user.getEmail());
		u.setPhone(user.getPhone());
		u.setAddress(user.getAddress());
		if(!u.getPassword().equals(user.getPassword())) {
			u.setPassword(passwordEncoder.encode(user.getPassword()));
			System.out.println(u.getPassword());
		}else {
			u.setPassword(user.getPassword());
			System.out.println(user.getPassword());
		}
		System.out.println(u.getPassword());
		return ResponseEntity.ok(userService.saveAdmin(u));
	}
	
	
	@DeleteMapping("/deleteUser/{userid}")
	void deleteUser(@PathVariable("userid")Integer userid){
		userService.deleteById(userid);
	}
}

@Data
class RoleToUserForm {
	private String username;
	private Integer roleId;
}
