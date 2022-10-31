package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import project.models.Product;
import project.repository.ProductRepository;
import project.service.ProductService;
@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;

	@Override
	public Product save(Product pro) {
		return productRepository.save(pro);
	}

	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}

	@Override
	public Page<Product> findAll(Pageable pageable) {
		return productRepository.findAll(pageable);
	}

	@Override
	public void deleteAll() {
		productRepository.deleteAll();
	}

	@Override
	public Page<Product> getAllProductForPageable(int page, int size) {
		return productRepository.findAll(PageRequest.of(page, size));
	}


	@Override
	public void deleteById(String id) {
		productRepository.deleteById(id);
	}

	@Override
	public Product getById(String id) {
		return productRepository.getById(id);
	}

	@Override
	public Optional<Product> findById(String id) {
		return productRepository.findById(id);
	}

	@Override
	public List<Product> findProName(String proName) {
		return productRepository.findProName(proName);
	}

	@Override
	public List<Product> getProByCateId(Integer cateId) {
		return productRepository.getProByCateId(cateId);
	}

	@Override
	public List<Product> findAllByOrderByProIdDesc() {
		return productRepository.findAllByOrderByProIdDesc();
	}

	@Override
	public List<Product> findBySalePrice() {
		return productRepository.findBySalePrice();
	}

	
}
