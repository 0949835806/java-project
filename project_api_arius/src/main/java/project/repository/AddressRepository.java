package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer>{

	@Query("SELECT a FROM Address a WHERE a.userId.username = ?1")
	List<Address> getAddressByUser(String username);
}
