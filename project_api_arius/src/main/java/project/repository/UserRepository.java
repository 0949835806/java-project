package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	User findByUsername(String username);
	
	@Query("SELECT u FROM User u WHERE u.email = ?1")
	User findByEmail(String email);
	

}
