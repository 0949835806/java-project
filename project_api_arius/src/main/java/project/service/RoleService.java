package project.service;

import java.util.List;
import java.util.Optional;

import project.models.Role;

public interface RoleService {

	List<Role> findAll();

	Role getByName(String name);

	Optional<Role> findById(Integer id);


}
