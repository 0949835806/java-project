package project.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.CriteriaBuilder.In;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import project.models.Role;
import project.models.User;
import project.repository.RoleRepository;
import project.repository.UserRepository;
import project.service.UserService;

@Service
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = userRepo.findByUsername(username);
		if (user == null) {
			log.error("User not found in the database");
			throw new UsernameNotFoundException("User not found in the database");
		} else {
			log.info("User found in the database: {}", username);
		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role -> {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		});
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
	}
	@Override
	public User saveUser(User user) {
		log.info("Saving new user {} to the database", user.getUsername());
		
		return userRepo.save(user);
	}
	
	@Override
	public User saveAdmin(User user) {
		log.info("Saving new user {} to the database", user.getUsername());
		
		return userRepo.save(user);
	}
	
	@Override
	public Role saveRole(Role role) {
		log.info("Saving new role {} to the database", role.getName());
		return roleRepo.save(role);
	}
	@Override
	public void addRoleToUser(String username, Integer roleId) {
		log.info("Adding role {} to user {}", roleId, username);
		User user = userRepo.findByUsername(username);
		Role role = roleRepo.findById(roleId).get();
		user.getRoles().add(role);
		
	}
	@Override
	public User getUser(String username) {
		log.info("Fetching user {}", username);
		return userRepo.findByUsername(username);
	}
	@Override
	public List<User> getUsers() { 
		return userRepo.findAll();
	}

	@Override
	public void deleteById(Integer userid) {
		userRepo.deleteById(userid);
	}
	
	@Override
	public Optional<User> getById(Integer userid) {
		return userRepo.findById(userid);
	}
	@Override
	public User findByUsername(String username) {
		return userRepo.findByUsername(username);
	}
	
	
}
