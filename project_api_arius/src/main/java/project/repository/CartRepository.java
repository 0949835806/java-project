package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer>{

	@Query("SELECT c FROM Cart c WHERE c.productCart.proId = ?1")
	List<Cart> getCartByProId(String proId);
}
