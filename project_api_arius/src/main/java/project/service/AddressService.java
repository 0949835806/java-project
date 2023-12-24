package project.service;

import java.util.List;
import java.util.Optional;

import project.models.Address;

public interface AddressService {

	Address save(Address add);

	Address getById(Integer id);

	void deleteById(Integer id);

	Optional<Address> findById(Integer id);

	List<Address> findAll();

	List<Address> getAddressByUser(String username);

}
