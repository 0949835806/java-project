package project.service;

import java.util.List;
import java.util.Optional;

import project.models.Cart;

public interface CartService {

	Cart getById(Integer id);

	void deleteAll();

	void deleteById(Integer id);

	Optional<Cart> findById(Integer id);

	List<Cart> findAll();

	Cart save(Cart cart);

	List<Cart> getCartByProId(String proId);

}
