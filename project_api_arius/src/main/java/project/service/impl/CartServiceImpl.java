package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.Cart;
import project.models.Product;
import project.repository.CartRepository;
import project.repository.ProductRepository;
import project.service.CartService;

@Service
public class CartServiceImpl implements CartService{

	@Autowired
	private CartRepository cartRepo;

	@Override
	public Cart save(Cart cart) {
		return cartRepo.save(cart);
	}

	@Override
	public List<Cart> findAll() {
		return cartRepo.findAll();
	}

	@Override
	public Optional<Cart> findById(Integer id) {
		return cartRepo.findById(id);
	}

	@Override
	public void deleteById(Integer id) {
		cartRepo.deleteById(id);
	}

	@Override
	public List<Cart> getCartByProId(String proId) {
		return cartRepo.getCartByProId(proId);
	}

	@Override
	public void deleteAll() {
		cartRepo.deleteAll();
	}

	@Override
	public Cart getById(Integer id) {
		return cartRepo.getById(id);
	}
	
}
