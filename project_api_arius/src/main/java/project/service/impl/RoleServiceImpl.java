package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.Role;
import project.repository.RoleRepository;
import project.service.RoleService;
@Service
public class RoleServiceImpl implements RoleService{
	
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public List<Role> findAll() {
		return roleRepository.findAll();
	}

	@Override
	public Role getByName(String name) {
		return roleRepository.findByName(name);
	}

	@Override
	public Optional<Role> findById(Integer id) {
		return roleRepository.findById(id);
	}


	
}
