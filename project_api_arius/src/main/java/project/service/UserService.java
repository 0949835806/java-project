package project.service;

import java.util.List;
import java.util.Optional;

import project.models.Role;
import project.models.User;

public interface UserService {
	User saveUser(User user);
	Role saveRole(Role role);
	void addRoleToUser(String username,Integer roleId);
	User getUser(String username);
	List<User> getUsers();
	void deleteById(Integer userid);
	Optional<User> getById(Integer userid);
	User saveAdmin(User user);
	User findByUsername(String username);
	Optional<User> findById(Integer id);
	User findByEmail(String email);
}
