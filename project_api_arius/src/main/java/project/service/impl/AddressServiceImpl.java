package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.Address;
import project.repository.AddressRepository;
import project.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressRepository repo;

	@Override
	public Address save(Address add) {
		return repo.save(add);
	}

	@Override
	public List<Address> findAll() {
		return repo.findAll();
	}

	@Override
	public Optional<Address> findById(Integer id) {
		return repo.findById(id);
	}

	@Override
	public void deleteById(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public Address getById(Integer id) {
		return repo.getById(id);
	}

	@Override
	public List<Address> getAddressByUser(String username) {
		return repo.getAddressByUser(username);
	}

}
